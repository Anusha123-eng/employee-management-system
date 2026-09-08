package com.example.demo.Controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class helloController {


  @GetMapping("/")
 // create method
    public String showHelloPage()
    {
        System.out.println("this is showhellopage");
        return "hello";
    }
}
