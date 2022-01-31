package com.empresa.proyecto.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.empresa.proyecto.dto.response.Maestra;

public class MaestraMapper implements RowMapper<Maestra> {

	public Maestra mapRow(ResultSet rs, int rowNum) throws SQLException {
		Maestra c = new Maestra();
		c.setIdItem(rs.getInt("ID_ITEM"));
		c.setIdTabla(rs.getInt("ID_TABLA"));
		c.setNombre(rs.getString("NOMBRE"));
		c.setCodigo(rs.getString("CODIGO"));
		c.setDescripcion(rs.getString("DESCRIPCION"));
		return c;
	}

}
