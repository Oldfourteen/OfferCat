package com.offercat.student.dao;

import com.offercat.student.vo.ForumInboxMsgVO;
import com.offercat.student.vo.ForumUnreadCountVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ForumSysMessageMapper {

    int insert(@Param("receiverId") Long receiverId,
               @Param("senderId") Long senderId,
               @Param("msgType") Integer msgType,
               @Param("targetId") Long targetId,
               @Param("postId") Long postId,
               @Param("content") String content);

    ForumUnreadCountVO countUnreadGrouped(@Param("receiverId") Long receiverId);

    int countUnreadByTypes(@Param("receiverId") Long receiverId,
                          @Param("types") List<Integer> types);

    List<ForumInboxMsgVO> selectLikesInbox(@Param("receiverId") Long receiverId,
                                           @Param("offset") Integer offset,
                                           @Param("limit") Integer limit);

    List<ForumInboxMsgVO> selectRepliesInbox(@Param("receiverId") Long receiverId,
                                             @Param("offset") Integer offset,
                                             @Param("limit") Integer limit);

    int markRead(@Param("receiverId") Long receiverId, @Param("msgIds") List<Long> msgIds);

    int markReadByMsgTypes(@Param("receiverId") Long receiverId, @Param("types") List<Integer> types);

    int markAllUnread(@Param("receiverId") Long receiverId);
}