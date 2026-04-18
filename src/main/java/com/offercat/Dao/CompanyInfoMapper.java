package com.offercat.Dao;

import com.offercat.entity.CompanyInfo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

/**
 * @author: blue
 * @date: 2026/4/17 - 20:15
 * @mail: 3590038173@qq.com
 * @info:
 */
@Mapper
public interface CompanyInfoMapper {
    @Insert("INSERT INTO company_info(company_name, credit_code, business_scope, address, contact_phone, audit_status, create_time) " +
            "VALUES(#{companyName}, #{creditCode}, #{businessScope}, #{address}, #{contactPhone}, 0, #{createTime})")
    @Options(useGeneratedKeys = true, keyProperty = "companyId")
    int insert(CompanyInfo companyInfo);

    @Select("SELECT * FROM company_info WHERE company_id = #{companyId}")
    CompanyInfo selectById(Long companyId);
}
