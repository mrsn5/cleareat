package capprezy.ua.model;

import capprezy.ua.model.other.PostgreSQLEnumType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static java.sql.Timestamp.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity(name = "_order")
@TypeDef(
        name = "pgsql_enum",
        typeClass = PostgreSQLEnumType.class
)
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer uid;

    private Timestamp orderTime = new Timestamp(System.currentTimeMillis());
    private Timestamp readyTime;
    private String preferences;
    private Double total = .0;
    private Double paid = .0;

    @ManyToOne
    @JoinColumn(name = "clientUid")
    @JsonIgnoreProperties({"password", "role"})
    private AppUser client;

    @OneToMany(mappedBy = "order")
    @JsonIgnoreProperties({"order"})
    private List<Portion> portions = new ArrayList<>();


    public enum PaymentStateType {
        not_paid, fully_paid, part_paid
    }

    public enum OrderStateType {
        in_check, confirmed, in_progress, ready, took_away, cancelled
    }

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "payment_state_type")
    @Type( type = "pgsql_enum" )
    private PaymentStateType paymentState = PaymentStateType.not_paid;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "order_state_type")
    @Type( type = "pgsql_enum" )
    private OrderStateType orderState = OrderStateType.in_check;;
}
