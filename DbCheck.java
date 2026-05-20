import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class DbCheck {
    public static void main(String[] args) {
        String url = "jdbc:mysql://127.0.0.1:3306/offercat?useUnicode=true&characterEncoding=utf-8&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Shanghai";
        String user = "root";
        String password = "1029384756";
        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {
            ResultSet rs = stmt.executeQuery("SHOW TABLES LIKE 'user_personal_galaxy'");
            if (rs.next()) {
                System.out.println("Table exists.");
            } else {
                System.out.println("Table does NOT exist.");
                stmt.executeUpdate("CREATE TABLE `user_personal_galaxy` (" +
                        "`user_id` BIGINT NOT NULL," +
                        "`galaxy_json` JSON NOT NULL," +
                        "`create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP," +
                        "`update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
                        "PRIMARY KEY (`user_id`)" +
                        ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");
                System.out.println("Table created.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}