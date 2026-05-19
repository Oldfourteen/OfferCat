package com.offercat.student.controller;

import com.offercat.student.common.ResponseResult;
import com.offercat.student.dao.ForumFriendMapper;
import com.offercat.student.dao.ForumSysMessageMapper;
import com.offercat.student.dto.ForumMarkReadDTO;
import com.offercat.student.vo.ForumInboxMsgVO;
import com.offercat.student.vo.ForumUnreadCountVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/forum/message")
@CrossOrigin(origins = "*")
public class ForumMessageController {

    @Autowired
    private ForumSysMessageMapper forumSysMessageMapper;

    @Autowired
    private ForumFriendMapper forumFriendMapper;

    @GetMapping("/unread-counts")
    public ResponseResult<Map<String, Object>> unreadCounts(@RequestParam("userId") Long userId) {
        ForumUnreadCountVO grouped = forumSysMessageMapper.countUnreadGrouped(userId);
        Map<String, Object> map = new HashMap<>();
        if (grouped == null) {
            map.put("replies", 0L);
            map.put("likes", 0L);
        } else {
            map.put("replies", grouped.getReplies() != null ? grouped.getReplies() : 0L);
            map.put("likes", grouped.getLikes() != null ? grouped.getLikes() : 0L);
        }
        map.put("friendRequests", (long) forumFriendMapper.countPendingIncoming(userId));
        return ResponseResult.success(map);
    }

    @GetMapping("/likes-inbox")
    public ResponseResult<List<ForumInboxMsgVO>> likesInbox(
            @RequestParam("userId") Long userId,
            @RequestParam(value = "pageNum", required = false, defaultValue = "1") Integer pageNum,
            @RequestParam(value = "pageSize", required = false, defaultValue = "50") Integer pageSize) {
        int ps = Math.min(Math.max(pageSize != null ? pageSize : 50, 1), 100);
        int pn = Math.max(pageNum != null ? pageNum : 1, 1);
        int offset = (pn - 1) * ps;
        List<ForumInboxMsgVO> list = forumSysMessageMapper.selectLikesInbox(userId, offset, ps);
        return ResponseResult.success(list);
    }

    @GetMapping("/replies-inbox")
    public ResponseResult<List<ForumInboxMsgVO>> repliesInbox(
            @RequestParam("userId") Long userId,
            @RequestParam(value = "pageNum", required = false, defaultValue = "1") Integer pageNum,
            @RequestParam(value = "pageSize", required = false, defaultValue = "50") Integer pageSize) {
        int ps = Math.min(Math.max(pageSize != null ? pageSize : 50, 1), 100);
        int pn = Math.max(pageNum != null ? pageNum : 1, 1);
        int offset = (pn - 1) * ps;
        List<ForumInboxMsgVO> list = forumSysMessageMapper.selectRepliesInbox(userId, offset, ps);
        return ResponseResult.success(list);
    }

    @PostMapping("/mark-read")
    public ResponseResult<Void> markRead(@RequestBody(required = false) ForumMarkReadDTO dto) {
        if (dto == null || dto.getUserId() == null) {
            return ResponseResult.error("用户ID不能为空");
        }
        Long uid = dto.getUserId();
        String scope = dto.getScope() == null ? "all" : dto.getScope();
        switch (scope) {
            case "replies":
                forumSysMessageMapper.markReadByMsgTypes(uid, Arrays.asList(2, 3, 4, 5));
                break;
            case "likes":
                forumSysMessageMapper.markReadByMsgTypes(uid, Arrays.asList(1, 6));
                break;
            case "all":
            default:
                forumSysMessageMapper.markAllUnread(uid);
                break;
        }
        return ResponseResult.success();
    }
}
