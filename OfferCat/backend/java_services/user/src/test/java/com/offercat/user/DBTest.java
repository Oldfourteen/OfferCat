package com.offercat.user;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class DBTest {
    public static void main(String[] args) {
        String url = "jdbc:mysql://start.awacode.top:21525/offercat?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=UTC";
        try (Connection conn = DriverManager.getConnection(url, "root", "1029384756");
             Statement stmt = conn.createStatement()) {
             
            System.out.println("Connected to DB!");
            ResultSet rs = stmt.executeQuery("SELECT * FROM `user` LIMIT 1");
            if (rs.next()) {
                System.out.println("User table exists, first phone: " + rs.getString("phone"));
            } else {
                System.out.println("User table exists but is empty.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
