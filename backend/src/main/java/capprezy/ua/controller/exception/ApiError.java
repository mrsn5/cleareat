package capprezy.ua.controller.exception;

import lombok.*;

@Getter
@ToString
@EqualsAndHashCode
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApiError {
    private String message;
}