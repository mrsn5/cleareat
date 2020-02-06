package capprezy.ua.controller;

import capprezy.ua.controller.exception.AlreadyExistsException;
import capprezy.ua.model.AppUser;
import capprezy.ua.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/")
public class RootController {

    @Autowired
    private AppUserService userService;

//    @GetMapping("/")
//    public RedirectView redirectWithUsingRedirectView(
//            RedirectAttributes attributes) {
////        attributes.addFlashAttribute("flashAttribute", "redirectWithRedirectView");
////        attributes.addAttribute("attribute", "redirectWithRedirectView");
//        return new RedirectView("index.html");
//    }

    @PostMapping("api/register")
    public ResponseEntity<AppUser> registerUser(@RequestBody AppUser appUser) throws AlreadyExistsException {
        System.out.println(appUser.toString());
        userService.register(appUser);
        return ResponseEntity.ok().build();
    }
}
