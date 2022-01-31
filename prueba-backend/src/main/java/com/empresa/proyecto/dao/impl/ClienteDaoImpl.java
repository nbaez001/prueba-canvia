package com.empresa.proyecto.dao.impl;

import java.sql.Types;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import com.empresa.proyecto.dao.ClienteDao;
import com.empresa.proyecto.dto.request.ClienteBuscar;
import com.empresa.proyecto.dto.response.Cliente;
import com.empresa.proyecto.dto.response.OutResponse;
import com.empresa.proyecto.dto.response.mapper.ClienteMapper;
import com.empresa.proyecto.util.ConstanteUtil;
import com.empresa.proyecto.util.MapUtil;

@Repository
public class ClienteDaoImpl implements ClienteDao {

	@Autowired
	DataSource dataSource;

	@Override
	public OutResponse<Cliente> registrarCliente(Cliente c) {
		OutResponse<Cliente> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_PRUEBA)
					.withCatalogName(ConstanteUtil.BD_PCK_CLIENTE).withProcedureName("SP_I_CLIENTE");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_NOMBRE", c.getNombre(), Types.VARCHAR);
			in.addValue("P_APELLIDO_PAT", c.getApellidoPat(), Types.VARCHAR);
			in.addValue("P_APELLIDO_MAT", c.getApellidoMat(), Types.VARCHAR);
			in.addValue("P_IDT_TIPO_DOCUMENTO", c.getIdtTipoDocumento(), Types.NUMERIC);
			in.addValue("P_NRO_DOCUMENTO", c.getNroDocumento(), Types.VARCHAR);
			in.addValue("P_ID_USUARIO_CREA", c.getIdUsuarioCrea(), Types.NUMERIC);

			Map<String, Object> out = jdbcCall.execute(in);

			rCodigo = Integer.parseInt(out.get(ConstanteUtil.R_CODIGO).toString());
			rMensaje = out.get(ConstanteUtil.R_MENSAJE).toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				c.setId(MapUtil.getLong(out.get("R_ID")));

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(c);
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

	@Override
	public OutResponse<?> modificarCliente(Cliente c) {
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_PRUEBA)
					.withCatalogName(ConstanteUtil.BD_PCK_CLIENTE).withProcedureName("SP_U_CLIENTE");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID", c.getId(), Types.NUMERIC);
			in.addValue("P_NOMBRE", c.getNombre(), Types.VARCHAR);
			in.addValue("P_APELLIDO_PAT", c.getApellidoPat(), Types.VARCHAR);
			in.addValue("P_APELLIDO_MAT", c.getApellidoMat(), Types.VARCHAR);
			in.addValue("P_IDT_TIPO_DOCUMENTO", c.getIdtTipoDocumento(), Types.NUMERIC);
			in.addValue("P_NRO_DOCUMENTO", c.getNroDocumento(), Types.NUMERIC);
			in.addValue("P_ID_USUARIO_MOD", c.getIdUsuarioMod(), Types.NUMERIC);

			Map<String, Object> out = jdbcCall.execute(in);

			rCodigo = Integer.parseInt(out.get(ConstanteUtil.R_CODIGO).toString());
			rMensaje = out.get(ConstanteUtil.R_MENSAJE).toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			} else {
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
			outResponse.setObjeto(null);
		}
		return outResponse;
	}

	@Override
	public OutResponse<List<Cliente>> listarCliente(Cliente r) {
		OutResponse<List<Cliente>> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_PRUEBA)
					.withCatalogName(ConstanteUtil.BD_PCK_CLIENTE).withProcedureName("SP_L_CLIENTE")
					.returningResultSet("R_LISTA", new ClienteMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_NOMBRE", r.getNombre(), Types.VARCHAR);
			in.addValue("P_FLAG_ACTIVO", r.getFlgActivo(), Types.NUMERIC);

			Map<String, Object> out = jdbcCall.execute(in);

			rCodigo = Integer.parseInt(out.get(ConstanteUtil.R_CODIGO).toString());
			rMensaje = out.get(ConstanteUtil.R_MENSAJE).toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				List<Cliente> res = MapUtil.getType(out.get("R_LISTA"));
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

	@Override
	public OutResponse<?> eliminarClienteLogica(Cliente r) {
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_PRUEBA)
					.withCatalogName(ConstanteUtil.BD_PCK_CLIENTE).withProcedureName("SP_D_CLIENTE_LOGICA");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID", r.getId(), Types.NUMERIC);

			Map<String, Object> out = jdbcCall.execute(in);

			rCodigo = Integer.parseInt(out.get(ConstanteUtil.R_CODIGO).toString());
			rMensaje = out.get(ConstanteUtil.R_MENSAJE).toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
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

	@Override
	public OutResponse<?> eliminarCliente(Cliente r) {
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_PRUEBA)
					.withCatalogName(ConstanteUtil.BD_PCK_CLIENTE).withProcedureName("SP_D_CLIENTE");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID", r.getId(), Types.NUMERIC);

			Map<String, Object> out = jdbcCall.execute(in);

			rCodigo = Integer.parseInt(out.get(ConstanteUtil.R_CODIGO).toString());
			rMensaje = out.get(ConstanteUtil.R_MENSAJE).toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
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

	@Override
	public OutResponse<List<Cliente>> listarClientePaginado(ClienteBuscar r) {
		OutResponse<List<Cliente>> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_PRUEBA)
					.withCatalogName(ConstanteUtil.BD_PCK_CLIENTE).withProcedureName("SP_L_CLIENTE_PAGINADO")
					.returningResultSet("R_LISTA", new ClienteMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_NOMBRE", r.getNombre(), Types.VARCHAR);
			in.addValue("P_FLAG_ACTIVO", r.getFlgActivo(), Types.NUMERIC);
			in.addValue("P_INDEX", r.getIndex(), Types.NUMERIC);
			in.addValue("P_SIZE", r.getSize(), Types.NUMERIC);

			Map<String, Object> out = jdbcCall.execute(in);

			rCodigo = Integer.parseInt(out.get(ConstanteUtil.R_CODIGO).toString());
			rMensaje = out.get(ConstanteUtil.R_MENSAJE).toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				List<Cliente> res = MapUtil.getType(out.get("R_LISTA"));
				Integer length = MapUtil.getInt(out.get("R_SIZE"));

				outResponse.setObjeto(res);
				outResponse.setLength(length);

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
