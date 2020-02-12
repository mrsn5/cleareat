package capprezy.ua.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity(name = "_dish_ingredient")
public class DishIngredient implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer dishUid;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ingredientUid;


    private Double quantity;

    @ManyToOne
    @JoinColumn(name = "ingredientUid")
    Ingredient ingredient;
}

