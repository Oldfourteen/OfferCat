package com.offercat.student.controller;

import com.offercat.student.common.ResponseResult;
import com.offercat.student.dto.ForumFriendBidDTO;
import com.offercat.student.dto.ForumFriendRespondDTO;
import com.offercat.student.service.ForumFriendService;
import com.offercat.student.vo.ForumFriendRequestVO;
import com.offercat.student.vo.ForumFriendUserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/forum/friend")
@CrossOrigin(origins = "*")
public class ForumFriendController {

    @Autowired
    private ForumFriendService forumFriendService;

    @PostMapping("/request")
    public ResponseResult<Void> sendRequest(@RequestBody ForumFriendBidDTO dto) {
        if (dto == null || dto.getFromUserId() == null || dto.getToUserId() == null) {
            return ResponseResult.error("用户ID不能为空");
        }
        try {
            forumFriendService.sendRequest(dto.getFromUserId(), dto.getToUserId());
            return ResponseResult.success();
        } catch (IllegalArgumentException | IllegalStateException ex) {
            return ResponseResult.error(ex.getMessage());
        } catch (Exception ex) {
            return ResponseResult.error("申请失败：" + ex.getMessage());
        }
    }

    @PostMapping("/respond")
    public ResponseResult<Void> respond(@RequestBody ForumFriendRespondDTO dto) {
        if (dto == null || dto.getRequestId() == null || dto.getUserId() == null) {
            return ResponseResult.error("参数不完整");
        }
        try {
            forumFriendService.respond(dto.getRequestId(), dto.getUserId(),
                    Boolean.TRUE.equals(dto.getAccept()));
            return ResponseResult.success();
        } catch (IllegalArgumentException | IllegalStateException ex) {
            return ResponseResult.error(ex.getMessage());
        } catch (Exception ex) {
            return ResponseResult.error("操作失败：" + ex.getMessage());
        }
    }

    @GetMapping("/incoming")
    public ResponseResult<List<ForumFriendRequestVO>> incoming(@RequestParam("userId") Long userId) {
        return ResponseResult.success(forumFriendService.listPendingIncoming(userId));
    }

    @GetMapping("/accepted")
    public ResponseResult<List<ForumFriendUserVO>> friends(@RequestParam("userId") Long userId) {
        return ResponseResult.success(forumFriendService.listFriends(userId));
    }
}
