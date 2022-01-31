package com.empresa.proyecto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.empresa.proyecto.dto.request.MaestraBuscar;
import com.empresa.proyecto.dto.response.Maestra;
import com.empresa.proyecto.dto.response.OutResponse;
import com.empresa.proyecto.service.MaestraService;

@RestController
@RequestMapping("/maestra")
public class MaestraController {

	@Autowired
	MaestraService maestraService;

	@PostMapping("/listarMaestra")
	public OutResponse<List<Maestra>> listarMaestra(@RequestBody MaestraBuscar c) {
		return maestraService.listarMaestra(c);
	}
}
