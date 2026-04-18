package com.offercat.Dao;

import com.offercat.entity.CompanyAccount;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

/**
 * @author: blue
 * @date: 2026/4/17 - 20:14
 * @mail: 3590038173@qq.com
 * @info:
 */
@Mapper
public interface CompanyAccountMapper {
    @Insert("INSERT INTO company_account(user_id, company_id, position, is_admin, status, create_time) " +
            "VALUES(#{userId}, #{companyId}, #{position}, #{isAdmin}, #{status}, #{createTime})")
    int insert(CompanyAccount companyAccount);

    @Select("SELECT * FROM company_account WHERE user_id = #{userId}")
    CompanyAccount selectByUserId(Long userId);
}