package com.slm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {

    @GetMapping(value = { "/", "/{path:^(?!api|assets|favicon).*$}", "/{path:^(?!api|assets|favicon).*$}/**" })
    public String forward() {
        return "forward:/index.html";
    }
}
