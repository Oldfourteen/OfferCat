package com.offercat.student.controller;

import com.offercat.student.common.ResponseResult;
import com.offercat.student.vo.HelpFaqItem;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

/**
 * 帮助中心（常见问题），供 App 端通过网关 /api/help/** 访问。
 */
@RestController
@RequestMapping("/help")
@CrossOrigin(origins = "*")
public class HelpController {

    private static final List<HelpFaqItem> DEFAULT_FAQ = Arrays.asList(
            new HelpFaqItem("如何创建简历？", "在首页点击「创建简历」按钮，按照提示填写个人信息即可。"),
            new HelpFaqItem("如何修改密码？", "进入个人中心 → 设置 → 修改密码。"),
            new HelpFaqItem("如何联系客服？", "在帮助中心进入「在线客服」，或拨打页面展示的官方热线。"),
            new HelpFaqItem("数据如何备份？", "系统会将您的资料同步保存，具体策略以产品与运营公告为准。"),
            new HelpFaqItem("如何注销账号？", "进入设置 → 账号安全 → 注销账号（若入口未开放请咨询客服）。")
    );

    @GetMapping("/faq")
    public ResponseResult<List<HelpFaqItem>> listFaq() {
        return ResponseResult.success(DEFAULT_FAQ);
    }
}
