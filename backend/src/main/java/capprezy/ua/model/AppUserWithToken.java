package capprezy.ua.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AppUserWithToken {
    private Integer uid;
    private String mail;
    private String fullName;
    private String phone;
    private String token;

    public AppUserWithToken(AppUser user, String token) {
        uid = user.getUid();
        mail = user.getMail();
        fullName = user.getFullName();
        phone = user.getPhone();
        this.token = token;
    }
}
