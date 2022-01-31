package com.empresa.proyecto.dao;

import java.util.List;

import com.empresa.proyecto.dto.request.ClienteBuscar;
import com.empresa.proyecto.dto.response.Cliente;
import com.empresa.proyecto.dto.response.OutResponse;

public interface ClienteDao {

	public OutResponse<Cliente> registrarCliente(Cliente c);

	public OutResponse<?> modificarCliente(Cliente c);

	public OutResponse<List<Cliente>> listarCliente(Cliente r);

	public OutResponse<?> eliminarClienteLogica(Cliente r);

	public OutResponse<?> eliminarCliente(Cliente r);

	public OutResponse<List<Cliente>> listarClientePaginado(ClienteBuscar r);
}
