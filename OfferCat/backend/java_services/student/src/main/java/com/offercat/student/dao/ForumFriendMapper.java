package com.offercat.student.dao;

import com.offercat.student.vo.ForumFriendRequestVO;
import com.offercat.student.vo.ForumFriendUserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ForumFriendMapper {

    List<Long> listAcceptedFriendIds(@Param("userId") Long userId);

    ForumFriendRequestVO selectDirectional(@Param("fromUserId") Long fromUserId,
                                           @Param("toUserId") Long toUserId);

    ForumFriendRequestVO selectByRequestId(@Param("requestId") Long requestId);

    int insertRequest(@Param("fromUserId") Long fromUserId, @Param("toUserId") Long toUserId);

    int updateStatus(@Param("requestId") Long requestId, @Param("status") Integer status);

    int resetPendingSameDirection(@Param("fromUserId") Long fromUserId, @Param("toUserId") Long toUserId);

    List<ForumFriendRequestVO> listPendingIncoming(@Param("userId") Long userId);

    List<ForumFriendUserVO> listAcceptedFriends(@Param("userId") Long userId);

    int countPendingIncoming(@Param("userId") Long userId);

    ForumFriendUserVO selectUserBrief(@Param("userId") Long userId);
}
