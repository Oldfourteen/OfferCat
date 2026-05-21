package com.offercat.student.service.impl;

import com.offercat.student.dao.ForumFriendMapper;
import com.offercat.student.service.ForumFriendService;
import com.offercat.student.vo.ForumFriendRelationVO;
import com.offercat.student.vo.ForumFriendRequestVO;
import com.offercat.student.vo.ForumFriendUserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ForumFriendServiceImpl implements ForumFriendService {

    private static final int STATUS_PENDING = 0;
    private static final int STATUS_ACCEPTED = 1;
    private static final int STATUS_REJECTED = 2;

    @Autowired
    private ForumFriendMapper forumFriendMapper;

    @Override
    @Transactional
    public void sendRequest(Long fromUserId, Long toUserId) {
        if (fromUserId == null || toUserId == null) {
            throw new IllegalArgumentException("用户不能为空");
        }
        if (fromUserId.longValue() == toUserId.longValue()) {
            throw new IllegalArgumentException("不能向自己发起好友申请");
        }

        ForumFriendRequestVO directional = forumFriendMapper.selectDirectional(fromUserId, toUserId);
        if (directional == null) {
            forumFriendMapper.insertRequest(fromUserId, toUserId);
            return;
        }
        Integer st = directional.getStatus();
        if (st != null && st == STATUS_ACCEPTED) {
            throw new IllegalStateException("对方已是好友");
        }
        if (st != null && st == STATUS_PENDING) {
            throw new IllegalStateException("已申请，请耐心等待对方回应");
        }
        if (st != null && st == STATUS_REJECTED) {
            int affected = forumFriendMapper.resetPendingSameDirection(fromUserId, toUserId);
            if (affected == 0) {
                forumFriendMapper.insertRequest(fromUserId, toUserId);
            }
        }
    }

    @Override
    @Transactional
    public void respond(Long requestId, Long responderUserId, boolean accept) {
        ForumFriendRequestVO row = forumFriendMapper.selectByRequestId(requestId);
        if (row == null) {
            throw new IllegalArgumentException("申请不存在");
        }
        if (responderUserId == null || row.getToUserId() == null ||
                responderUserId.longValue() != row.getToUserId().longValue()) {
            throw new IllegalArgumentException("无权限操作该好友申请");
        }
        Integer st = row.getStatus();
        if (st == null || st != STATUS_PENDING) {
            throw new IllegalStateException("该申请已被处理");
        }
        forumFriendMapper.updateStatus(requestId, accept ? STATUS_ACCEPTED : STATUS_REJECTED);
    }

    @Override
    public List<ForumFriendRequestVO> listPendingIncoming(Long userId) {
        return forumFriendMapper.listPendingIncoming(userId);
    }

    @Override
    public List<ForumFriendRequestVO> listPendingOutgoing(Long userId) {
        return forumFriendMapper.listPendingOutgoing(userId);
    }

    @Override
    public List<ForumFriendUserVO> listFriends(Long userId) {
        List<ForumFriendUserVO> list = forumFriendMapper.listAcceptedFriends(userId);
        if (list != null) {
            for (ForumFriendUserVO u : list) {
                if (u.getNickname() != null && (u.getName() == null || u.getName().isEmpty())) {
                    u.setName(u.getNickname());
                }
                if ((u.getTagText() == null || u.getTagText().isEmpty())) {
                    u.setTagText("好友");
                }
                if ((u.getLastSeen() == null || u.getLastSeen().isEmpty())) {
                    u.setLastSeen("最近在论坛结识");
                }
            }
        }
        return list;
    }

    @Override
    public ForumFriendRelationVO getRelationStatus(Long userId, Long targetUserId) {
        ForumFriendRelationVO relation = new ForumFriendRelationVO();
        relation.setRelationStatus("none");
        if (userId == null || targetUserId == null) {
            return relation;
        }
        if (userId.longValue() == targetUserId.longValue()) {
            relation.setRelationStatus("self");
            return relation;
        }

        ForumFriendRequestVO directional = forumFriendMapper.selectDirectional(userId, targetUserId);
        ForumFriendRequestVO reverse = forumFriendMapper.selectDirectional(targetUserId, userId);

        if (isAccepted(directional) || isAccepted(reverse)) {
            relation.setRelationStatus("accepted");
            relation.setRequestId(isAccepted(directional) ? directional.getRequestId() : reverse.getRequestId());
            return relation;
        }
        if (isPending(reverse)) {
            relation.setRelationStatus("incoming_pending");
            relation.setRequestId(reverse.getRequestId());
            return relation;
        }
        if (isPending(directional)) {
            relation.setRelationStatus("outgoing_pending");
            relation.setRequestId(directional.getRequestId());
            return relation;
        }
        return relation;
    }

    private boolean isAccepted(ForumFriendRequestVO row) {
        return row != null && row.getStatus() != null && row.getStatus() == STATUS_ACCEPTED;
    }

    private boolean isPending(ForumFriendRequestVO row) {
        return row != null && row.getStatus() != null && row.getStatus() == STATUS_PENDING;
    }
}
