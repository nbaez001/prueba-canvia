package com.empresa.proyecto.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.empresa.proyecto.dto.response.Factura;

public class FacturaMapper implements RowMapper<Factura> {

	public Factura mapRow(ResultSet rs, int rowNum) throws SQLException {
		Factura c = new Factura();
		c.setId(rs.getLong("ID"));
		c.setIdCliente(rs.getLong("ID_CLIENTE"));
		c.setNroComprobante(rs.getString("NRO_COMPROBANTE"));
		c.setMonto(rs.getDouble("MONTO"));
		c.setNomCliente(rs.getString("NOM_CLIENTE"));
		c.setFecha(rs.getDate("FECHA"));
		c.setFlgActivo(rs.getInt("FLAG_ACTIVO"));
		return c;
	}

}
