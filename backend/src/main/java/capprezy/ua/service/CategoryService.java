package capprezy.ua.service;

import capprezy.ua.controller.exception.model.AlreadyExistsException;
import capprezy.ua.model.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAll();
    Category add(Category category) throws AlreadyExistsException;

    void delete(Category category);

    Category update(Category category);
}
