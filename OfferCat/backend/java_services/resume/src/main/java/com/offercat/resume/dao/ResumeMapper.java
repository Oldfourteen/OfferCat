package com.offercat.resume.dao;

import com.offercat.resume.entity.Resume;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 简历数据访问接口
 * 功能：操作简历相关的数据库操作
 * 实现：使用MyBatis框架，提供简历的增删改查方法
 */
@Mapper
public interface ResumeMapper {

    /**
     * 根据ID查询简历
     * 输入：简历ID
     * 输出：简历对象
     */
    Resume findById(Long id);

    /**
     * 根据用户ID查询简历列表
     * 输入：用户ID
     * 输出：简历列表
     */
    List<Resume> findByUserId(Long userId);

    /**
     * 插入简历
     * 输入：简历对象
     * 输出：影响的行数
     */
    int insert(Resume resume);

    /**
     * 更新简历
     * 输入：简历对象
     * 输出：影响的行数
     */
    int update(Resume resume);

    /**
     * 删除简历
     * 输入：简历ID
     * 输出：影响的行数
     */
    int deleteById(Long id);

    /**
     * 根据用户ID查询启用的简历
     * 输入：用户ID
     * 输出：简历对象
     */
    Resume findEnabledByUserId(Long userId);
}
