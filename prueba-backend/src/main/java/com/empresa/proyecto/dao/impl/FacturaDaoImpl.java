package com.empresa.proyecto.dao.impl;

import java.sql.Types;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import com.empresa.proyecto.dao.FacturaDao;
import com.empresa.proyecto.dto.request.FacturaBuscar;
import com.empresa.proyecto.dto.response.Factura;
import com.empresa.proyecto.dto.response.FacturaDetalle;
import com.empresa.proyecto.dto.response.OutResponse;
import com.empresa.proyecto.dto.response.mapper.FacturaDetalleMapper;
import com.empresa.proyecto.dto.response.mapper.FacturaMapper;
import com.empresa.proyecto.util.ConstanteUtil;
import com.empresa.proyecto.util.DateUtil;
import com.empresa.proyecto.util.MapUtil;

@Repository
public class FacturaDaoImpl implements FacturaDao {

	@Autowired
	DataSource dataSource;

	@Override
	public OutResponse<Factura> registrarFactura(Factura c) throws Exception {
		OutResponse<Factura> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_PRUEBA)
				.withCatalogName(ConstanteUtil.BD_PCK_FACTURA).withProcedureName("SP_I_FACTURA");

		MapSqlParameterSource in = new MapSqlParameterSource();
		in.addValue("P_NRO_COMPROBANTE", c.getNroComprobante(), Types.VARCHAR);
		in.addValue("P_MONTO", c.getMonto(), Types.NUMERIC);
		in.addValue("P_FECHA", DateUtil.slashDDMMYYYY(c.getFecha()), Types.VARCHAR);
		in.addValue("P_ID_CLIENTE", c.getIdCliente(), Types.NUMERIC);
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
			throw new Exception(rMensaje);
		}
		return outResponse;
	}

	@Override
	public OutResponse<?> registrarFacturaDetalle(Long idFactura, FacturaDetalle c) throws Exception {
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_PRUEBA)
				.withCatalogName(ConstanteUtil.BD_PCK_FACTURA).withProcedureName("SP_I_FACTURA_DETALLE");

		MapSqlParameterSource in = new MapSqlParameterSource();
		in.addValue("P_ID_FACTURA", idFactura, Types.NUMERIC);
		in.addValue("P_PRECIO", c.getPrecio(), Types.NUMERIC);
		in.addValue("P_CANTIDAD", c.getCantidad(), Types.NUMERIC);
		in.addValue("P_SUBTOTAL", c.getSubTotal(), Types.NUMERIC);
		in.addValue("P_CODIGO", c.getCodigo(), Types.VARCHAR);
		in.addValue("P_NOMBRE", c.getNombre(), Types.VARCHAR);
		in.addValue("P_ID_USUARIO_CREA", c.getIdUsuarioCrea(), Types.NUMERIC);

		Map<String, Object> out = jdbcCall.execute(in);

		rCodigo = Integer.parseInt(out.get(ConstanteUtil.R_CODIGO).toString());
		rMensaje = out.get(ConstanteUtil.R_MENSAJE).toString();

		if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
			outResponse.setRCodigo(rCodigo);
			outResponse.setRMensaje(rMensaje);
		} else {
			outResponse.setRCodigo(rCodigo);
			outResponse.setRMensaje(rMensaje);
			throw new Exception(rMensaje);
		}
		return outResponse;
	}

	@Override
	public OutResponse<?> modificarFactura(Factura c) throws Exception {
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";

		SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_PRUEBA)
				.withCatalogName(ConstanteUtil.BD_PCK_FACTURA).withProcedureName("SP_U_FACTURA");

		MapSqlParameterSource in = new MapSqlParameterSource();
		in.addValue("P_ID", c.getId(), Types.NUMERIC);
		in.addValue("P_NRO_COMPROBANTE", c.getNroComprobante(), Types.VARCHAR);
		in.addValue("P_MONTO", c.getMonto(), Types.NUMERIC);
		in.addValue("P_FECHA", DateUtil.slashDDMMYYYY(c.getFecha()), Types.VARCHAR);
		in.addValue("P_ID_CLIENTE", c.getIdCliente(), Types.NUMERIC);
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

			throw new Exception(rMensaje);
		}
		return outResponse;
	}

	@Override
	public OutResponse<?> modificarFacturaDetalle(FacturaDetalle c) throws Exception {
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";

		SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_PRUEBA)
				.withCatalogName(ConstanteUtil.BD_PCK_FACTURA).withProcedureName("SP_U_FACTURA_DETALLE");

		MapSqlParameterSource in = new MapSqlParameterSource();
		in.addValue("P_ID", c.getId(), Types.NUMERIC);
		in.addValue("P_PRECIO", c.getPrecio(), Types.NUMERIC);
		in.addValue("P_CANTIDAD", c.getCantidad(), Types.NUMERIC);
		in.addValue("P_SUBTOTAL", c.getSubTotal(), Types.NUMERIC);
		in.addValue("P_CODIGO", c.getCodigo(), Types.VARCHAR);
		in.addValue("P_NOMBRE", c.getNombre(), Types.VARCHAR);
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

			throw new Exception(rMensaje);
		}
		return outResponse;
	}

	@Override
	public OutResponse<List<Factura>> listarFactura(Factura r) {
		OutResponse<List<Factura>> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_PRUEBA)
					.withCatalogName(ConstanteUtil.BD_PCK_FACTURA).withProcedureName("SP_L_FACTURA")
					.returningResultSet("R_LISTA", new FacturaMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();

			Map<String, Object> out = jdbcCall.execute(in);

			rCodigo = Integer.parseInt(out.get(ConstanteUtil.R_CODIGO).toString());
			rMensaje = out.get(ConstanteUtil.R_MENSAJE).toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				List<Factura> res = MapUtil.getType(out.get("R_LISTA"));
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
	public OutResponse<?> eliminarFacturaLogica(Factura r) {
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_PRUEBA)
					.withCatalogName(ConstanteUtil.BD_PCK_FACTURA).withProcedureName("SP_D_FACTURA_LOGICA");

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
	public OutResponse<?> eliminarFactura(Factura r) {
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_PRUEBA)
					.withCatalogName(ConstanteUtil.BD_PCK_FACTURA).withProcedureName("SP_D_FACTURA");

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
	public OutResponse<List<Factura>> listarFacturaPaginado(FacturaBuscar r) {
		OutResponse<List<Factura>> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_PRUEBA)
					.withCatalogName(ConstanteUtil.BD_PCK_FACTURA).withProcedureName("SP_L_FACTURA_PAGINADO")
					.returningResultSet("R_LISTA", new FacturaMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_NRO_COMPROBANTE", r.getNroComprobante(), Types.VARCHAR);
			in.addValue("P_FLAG_ACTIVO", r.getFlgActivo(), Types.NUMERIC);
			in.addValue("P_INDEX", r.getIndex(), Types.NUMERIC);
			in.addValue("P_SIZE", r.getSize(), Types.NUMERIC);

			Map<String, Object> out = jdbcCall.execute(in);

			rCodigo = Integer.parseInt(out.get(ConstanteUtil.R_CODIGO).toString());
			rMensaje = out.get(ConstanteUtil.R_MENSAJE).toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				List<Factura> res = MapUtil.getType(out.get("R_LISTA"));
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

	@Override
	public OutResponse<Factura> buscarFactura(Factura c) {
		OutResponse<Factura> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";

		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_PRUEBA)
					.withCatalogName(ConstanteUtil.BD_PCK_FACTURA).withProcedureName("SP_S_FACTURA")
					.returningResultSet("R_LISTA", new FacturaDetalleMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID", c.getId(), Types.NUMERIC);

			Map<String, Object> out = jdbcCall.execute(in);

			rCodigo = Integer.parseInt(out.get(ConstanteUtil.R_CODIGO).toString());
			rMensaje = out.get(ConstanteUtil.R_MENSAJE).toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				Factura f = new Factura();
				f.setId(c.getId());
				f.setIdCliente(MapUtil.getLong(out.get("R_ID_CLIENTE")));
				f.setNroComprobante(MapUtil.getString(out.get("R_NRO_COMPROBANTE")));
				f.setMonto(MapUtil.getDouble(out.get("R_MONTO")));
				f.setFecha(MapUtil.getDate(out.get("R_FECHA"), ConstanteUtil.guion_YYYYMMDD));
				f.setNomCliente(MapUtil.getString(out.get("R_NOM_CLIENTE")));

				List<FacturaDetalle> lista = MapUtil.getType(out.get("R_LISTA"));
				f.setListaDetalle(lista);

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(f);
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
