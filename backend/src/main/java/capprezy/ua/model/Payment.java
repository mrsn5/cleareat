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
    private Integer payment_id;
    private String status;
    private String public_key;
    private String order_id;
    private Double amount;
    private String currency;
}
