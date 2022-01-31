package com.empresa.proyecto.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.empresa.proyecto.dto.request.ClienteBuscar;
import com.empresa.proyecto.dto.response.Cliente;
import com.empresa.proyecto.dto.response.OutResponse;
import com.empresa.proyecto.service.ClienteService;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

	Logger log = LoggerFactory.getLogger(ClienteController.class);

	@Autowired
	ClienteService clienteService;

	@PostMapping("/registrarCliente")
	public OutResponse<Cliente> registrarCliente(@RequestBody Cliente c) {
		return clienteService.registrarCliente(c);
	}

	@PostMapping("/modificarCliente")
	public OutResponse<?> modificarCliente(@RequestBody Cliente c) {
		return clienteService.modificarCliente(c);
	}

	@PostMapping("/listarCliente")
	public OutResponse<List<Cliente>> listarCliente(@RequestBody Cliente c) {
		return clienteService.listarCliente(c);
	}

	@PostMapping("/eliminarClienteLogica")
	public OutResponse<?> eliminarClienteLogica(@RequestBody Cliente c) {
		return clienteService.eliminarClienteLogica(c);
	}

	@PostMapping("/eliminarCliente")
	public OutResponse<?> eliminarCliente(@RequestBody Cliente c) {
		return clienteService.eliminarCliente(c);
	}

	@PostMapping("/listarClientePaginado")
	public OutResponse<List<Cliente>> listarClientePaginado(@RequestBody ClienteBuscar r) {
		return clienteService.listarClientePaginado(r);
	}
}
