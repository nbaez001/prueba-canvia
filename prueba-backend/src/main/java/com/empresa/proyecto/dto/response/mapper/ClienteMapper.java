package com.empresa.proyecto.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.empresa.proyecto.dto.response.Cliente;

public class ClienteMapper implements RowMapper<Cliente> {

	public Cliente mapRow(ResultSet rs, int rowNum) throws SQLException {
		Cliente c = new Cliente();
		c.setId(rs.getLong("ID"));
		c.setNombre(rs.getString("NOMBRE"));
		c.setApellidoPat(rs.getString("APELLIDO_PAT"));
		c.setApellidoMat(rs.getString("APELLIDO_MAT"));
		c.setIdtTipoDocumento(rs.getInt("IDT_TIPO_DOCUMENTO"));
		c.setDescTipoDocumento(rs.getString("DES_TIPO_DOCUMENTO"));
		c.setNroDocumento(rs.getString("NRO_DOCUMENTO"));
		return c;
	}

}
