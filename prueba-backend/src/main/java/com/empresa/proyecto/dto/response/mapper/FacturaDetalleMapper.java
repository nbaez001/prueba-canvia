package com.empresa.proyecto.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.empresa.proyecto.dto.response.FacturaDetalle;

public class FacturaDetalleMapper implements RowMapper<FacturaDetalle> {

	public FacturaDetalle mapRow(ResultSet rs, int rowNum) throws SQLException {
		FacturaDetalle c = new FacturaDetalle();
		c.setId(rs.getLong("ID"));
		c.setPrecio(rs.getDouble("PRECIO"));
		c.setCantidad(rs.getDouble("CANTIDAD"));
		c.setSubTotal(rs.getDouble("SUBTOTAL"));
		c.setCodigo(rs.getString("CODIGO"));
		c.setNombre(rs.getString("NOMBRE"));
		return c;
	}

}
