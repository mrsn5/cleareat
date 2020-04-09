package capprezy.ua.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Payment {
    private String action;
    private Integer paymentId;
    private String status;
    private String publicKey;
    private String orderId;
    private Double amount;
    private String currency;
}
