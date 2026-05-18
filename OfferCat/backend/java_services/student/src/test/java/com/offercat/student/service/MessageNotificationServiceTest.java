package com.offercat.student.service;

import com.offercat.student.entity.MessageNotification;
import com.offercat.student.service.impl.MessageNotificationServiceImpl;
import com.offercat.user.dao.UserMapper;
import com.offercat.user.entity.User;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 消息通知服务测试类
 * 验证客服消息广播功能
 */
@SpringBootTest
@Transactional
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class MessageNotificationServiceTest {

    @Autowired
    private MessageNotificationService notificationService;

    @Autowired
    private UserMapper userMapper;

    // 测试用户数据
    private User testAdmin1;
    private User testAdmin2;
    private User testStudent;

    @BeforeEach
    void setUp() {
        // 创建测试管理员用户1
        testAdmin1 = new User();
        testAdmin1.setPassword("admin123");
        testAdmin1.setNickname("管理员张三");
        testAdmin1.setPhone("13800138001");
        testAdmin1.setUserRole(4); // 管理员
        testAdmin1.setUserStatus(1);
        testAdmin1.setCreateTime(LocalDateTime.now());
        userMapper.insert(testAdmin1);

        // 创建测试管理员用户2
        testAdmin2 = new User();
        testAdmin2.setPassword("admin456");
        testAdmin2.setNickname("管理员李四");
        testAdmin2.setPhone("13800138002");
        testAdmin2.setUserRole(4); // 管理员
        testAdmin2.setUserStatus(1);
        testAdmin2.setCreateTime(LocalDateTime.now());
        userMapper.insert(testAdmin2);

        // 创建测试普通用户
        testStudent = new User();
        testStudent.setPassword("student123");
        testStudent.setNickname("普通用户王五");
        testStudent.setPhone("13800138003");
        testStudent.setUserRole(1); // 普通用户
        testStudent.setUserStatus(1);
        testStudent.setCreateTime(LocalDateTime.now());
        userMapper.insert(testStudent);

        System.out.println("=== 测试数据准备完成 ===");
        System.out.println("管理员1: userId=" + testAdmin1.getUserId() + ", nickname=" + testAdmin1.getNickname());
        System.out.println("管理员2: userId=" + testAdmin2.getUserId() + ", nickname=" + testAdmin2.getNickname());
        System.out.println("普通用户: userId=" + testStudent.getUserId() + ", nickname=" + testStudent.getNickname());
    }

    @Test
    @DisplayName("测试普通用户发送客服消息 - 广播到所有管理员")
    void testSendCustomerServiceMessage_BroadcastToAdmins() {
        System.out.println("\n=== 开始测试: 普通用户发送客服消息 ===");
        
        // 普通用户发送客服消息
        notificationService.sendCustomerServiceMessage(
                testStudent.getUserId(),
                testStudent.getNickname(),
                testStudent.getPhone()
        );

        // 验证管理员1收到消息
        List<MessageNotification> admin1Messages = notificationService.getUserMessages(testAdmin1.getUserId());
        System.out.println("管理员1收到的消息数量: " + admin1Messages.size());
        
        // 验证管理员2收到消息
        List<MessageNotification> admin2Messages = notificationService.getUserMessages(testAdmin2.getUserId());
        System.out.println("管理员2收到的消息数量: " + admin2Messages.size());

        // 验证普通用户没有收到自己的消息
        List<MessageNotification> studentMessages = notificationService.getUserMessages(testStudent.getUserId());
        System.out.println("普通用户收到的消息数量: " + studentMessages.size());

        // 断言验证
        Assertions.assertEquals(1, admin1Messages.size(), "管理员1应该收到1条消息");
        Assertions.assertEquals(1, admin2Messages.size(), "管理员2应该收到1条消息");
        Assertions.assertEquals(0, studentMessages.size(), "普通用户不应该收到自己发送的客服消息");

        // 验证消息内容
        MessageNotification admin1Msg = admin1Messages.get(0);
        Assertions.assertEquals(testStudent.getUserId(), admin1Msg.getSenderId());
        Assertions.assertEquals(testStudent.getNickname(), admin1Msg.getSenderNickname());
        Assertions.assertEquals(testStudent.getPhone(), admin1Msg.getSenderPhone());
        Assertions.assertEquals(1, admin1Msg.getType(), "消息类型应为客服消息(1)");
        Assertions.assertEquals(testStudent.getNickname() + "@客服在吗", admin1Msg.getContent());
        Assertions.assertEquals(0, admin1Msg.getIsRead(), "消息应未读");

        System.out.println("\n✓ 客服消息广播测试通过！");
        System.out.println("消息内容: " + admin1Msg.getContent());
    }

    @Test
    @DisplayName("测试意见反馈 - 广播到所有管理员")
    void testSendFeedback_BroadcastToAdmins() {
        System.out.println("\n=== 开始测试: 用户发送意见反馈 ===");
        
        String feedbackContent = "希望能增加深色模式功能";
        
        // 用户发送意见反馈
        notificationService.sendFeedback(
                testStudent.getUserId(),
                testStudent.getNickname(),
                testStudent.getPhone(),
                feedbackContent
        );

        // 验证两个管理员都收到反馈
        List<MessageNotification> admin1Messages = notificationService.getUnreadMessages(testAdmin1.getUserId());
        List<MessageNotification> admin2Messages = notificationService.getUnreadMessages(testAdmin2.getUserId());

        Assertions.assertEquals(1, admin1Messages.size(), "管理员1应该收到1条反馈");
        Assertions.assertEquals(1, admin2Messages.size(), "管理员2应该收到1条反馈");

        // 验证反馈内容
        MessageNotification feedback = admin1Messages.get(0);
        Assertions.assertEquals(2, feedback.getType(), "消息类型应为意见反馈(2)");
        Assertions.assertTrue(feedback.getContent().contains("意见反馈"));
        Assertions.assertTrue(feedback.getContent().contains(feedbackContent));

        System.out.println("\n✓ 意见反馈广播测试通过！");
        System.out.println("反馈内容: " + feedback.getContent());
    }

    @Test
    @DisplayName("测试管理员回复用户消息")
    void testReplyToUser() {
        System.out.println("\n=== 开始测试: 管理员回复用户 ===");
        
        // 先让用户发送客服消息
        notificationService.sendCustomerServiceMessage(
                testStudent.getUserId(),
                testStudent.getNickname(),
                testStudent.getPhone()
        );

        // 管理员回复用户
        String replyContent = "您好，有什么可以帮助您的？";
        notificationService.replyToUser(
                testAdmin1.getUserId(),
                testAdmin1.getNickname(),
                testStudent.getUserId(),
                replyContent
        );

        // 验证用户收到回复
        List<MessageNotification> studentMessages = notificationService.getUserMessages(testStudent.getUserId());
        System.out.println("用户收到的消息数量: " + studentMessages.size());

        Assertions.assertEquals(1, studentMessages.size(), "用户应该收到1条管理员回复");

        MessageNotification reply = studentMessages.get(0);
        Assertions.assertEquals(3, reply.getType(), "消息类型应为管理员回复(3)");
        Assertions.assertTrue(reply.getContent().startsWith("管理员-"));
        Assertions.assertTrue(reply.getContent().contains(replyContent));

        System.out.println("\n✓ 管理员回复测试通过！");
        System.out.println("回复内容: " + reply.getContent());
    }

    @Test
    @DisplayName("测试消息状态管理")
    void testMessageStatusManagement() {
        System.out.println("\n=== 开始测试: 消息状态管理 ===");
        
        // 发送消息
        notificationService.sendCustomerServiceMessage(
                testStudent.getUserId(),
                testStudent.getNickname(),
                testStudent.getPhone()
        );

        // 获取未读数量
        Integer unreadCount = notificationService.getUnreadCount(testAdmin1.getUserId());
        System.out.println("未读消息数量: " + unreadCount);
        Assertions.assertEquals(1, unreadCount);

        // 获取消息
        List<MessageNotification> messages = notificationService.getUnreadMessages(testAdmin1.getUserId());
        Long msgId = messages.get(0).getId();

        // 标记为已读
        notificationService.markAsRead(msgId);
        unreadCount = notificationService.getUnreadCount(testAdmin1.getUserId());
        System.out.println("标记已读后未读数量: " + unreadCount);
        Assertions.assertEquals(0, unreadCount);

        // 标记所有已读（测试功能）
        notificationService.sendCustomerServiceMessage(
                testStudent.getUserId(),
                testStudent.getNickname(),
                testStudent.getPhone()
        );
        unreadCount = notificationService.getUnreadCount(testAdmin1.getUserId());
        System.out.println("再次发送消息后未读数量: " + unreadCount);
        Assertions.assertEquals(1, unreadCount);

        notificationService.markAllAsRead(testAdmin1.getUserId());
        unreadCount = notificationService.getUnreadCount(testAdmin1.getUserId());
        System.out.println("标记所有已读后未读数量: " + unreadCount);
        Assertions.assertEquals(0, unreadCount);

        System.out.println("\n✓ 消息状态管理测试通过！");
    }

    @AfterEach
    void tearDown() {
        System.out.println("\n=== 清理测试数据 ===");
        // 测试使用了 @Transactional，会自动回滚，无需手动清理
    }
}
