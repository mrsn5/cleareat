package capprezy.ua.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity(name = "_user")
@TypeDef(
        name = "pgsql_enum",
        typeClass = PostgreSQLEnumType.class
)
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer uid;
    private String mail;
    private String fullName;
    private String phone;

    private String password;


    public enum RoleType {
        admin, user
    }

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "role_type")
    @Type( type = "pgsql_enum" )
    private RoleType role;
}

