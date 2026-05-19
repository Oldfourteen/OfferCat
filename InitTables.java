import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.regex.Pattern;

public class InitTables {
    public static void main(String[] args) throws Exception {
        String url = "jdbc:mysql://127.0.0.1:3306/offercat?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=UTC";
        String user = "root";
        String password = "1029384756";
        
        System.out.println("Connecting to database...");
        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {
            
            String content = new String(Files.readAllBytes(Paths.get("OfferCat_DataBase.sql")));
            String[] statements = content.split(";");
            
            for (String sql : statements) {
                if (sql.trim().isEmpty()) continue;
                if (sql.contains("CREATE TABLE") && (
                    sql.contains("competition_award") ||
                    sql.contains("certificate_qualification") ||
                    sql.contains("project_experience") ||
                    sql.contains("internship_experience") ||
                    sql.contains("ai_user_session") ||
                    sql.contains("student_practice_session")
                )) {
                    System.out.println("Executing: " + sql.trim().substring(0, Math.min(50, sql.trim().length())) + "...");
                    stmt.execute(sql);
                }
            }
            System.out.println("Done!");
        }
    }
}
