package com.slm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    @GetMapping({ "/", "/catalog", "/product/**", "/checkout", "/track", "/admin" })
    public String forward() {
        return "forward:/index.html";
    }
}
