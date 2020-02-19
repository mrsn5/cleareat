package capprezy.ua.controller;

import capprezy.ua.controller.exception.model.AlreadyExistsException;
import capprezy.ua.model.Category;
import capprezy.ua.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity getAll(){
        return ResponseEntity.ok(categoryService.getAll());
    }

    @PostMapping
    public ResponseEntity add(@RequestBody @Valid Category category) throws AlreadyExistsException {
        return ResponseEntity.ok(categoryService.add(category));
    }
}
