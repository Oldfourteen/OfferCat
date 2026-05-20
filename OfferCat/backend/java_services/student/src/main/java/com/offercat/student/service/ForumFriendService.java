package com.offercat.student.service;

import com.offercat.student.vo.ForumFriendRequestVO;
import com.offercat.student.vo.ForumFriendRelationVO;
import com.offercat.student.vo.ForumFriendUserVO;

import java.util.List;

public interface ForumFriendService {

    void sendRequest(Long fromUserId, Long toUserId);

    void respond(Long requestId, Long responderUserId, boolean accept);

    List<ForumFriendRequestVO> listPendingIncoming(Long userId);

    List<ForumFriendUserVO> listFriends(Long userId);

    ForumFriendRelationVO getRelationStatus(Long userId, Long targetUserId);
}
