package com.empresa.proyecto.dao.impl;

import java.sql.Types;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import com.empresa.proyecto.dao.MaestraDao;
import com.empresa.proyecto.dto.request.MaestraBuscar;
import com.empresa.proyecto.dto.response.Maestra;
import com.empresa.proyecto.dto.response.OutResponse;
import com.empresa.proyecto.dto.response.mapper.MaestraMapper;
import com.empresa.proyecto.util.ConstanteUtil;
import com.empresa.proyecto.util.MapUtil;

@Repository
public class MaestraDaoImpl implements MaestraDao{

	@Autowired
	DataSource dataSource;

	@Override
	public OutResponse<List<Maestra>> listarMaestra(MaestraBuscar c) {
		OutResponse<List<Maestra>> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_PRUEBA)
					.withCatalogName(ConstanteUtil.BD_PCK_CLIENTE).withProcedureName("SP_L_MAESTRA")
					.returningResultSet("R_LISTA", new MaestraMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("N_ID_TABLA", c.getIdTabla(), Types.NUMERIC);

			Map<String, Object> out = jdbcCall.execute(in);

			rCodigo = Integer.parseInt(out.get(ConstanteUtil.R_CODIGO).toString());
			rMensaje = out.get(ConstanteUtil.R_MENSAJE).toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				List<Maestra> res = MapUtil.getType(out.get("R_LISTA"));
				outResponse.setObjeto(res);

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			} else {
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		return outResponse;
	}
}
