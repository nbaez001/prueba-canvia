package com.empresa.proyecto.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.empresa.proyecto.dao.MaestraDao;
import com.empresa.proyecto.dto.request.MaestraBuscar;
import com.empresa.proyecto.dto.response.Maestra;
import com.empresa.proyecto.dto.response.OutResponse;
import com.empresa.proyecto.service.MaestraService;

@Service
public class MaestraServiceImpl implements MaestraService {

	@Autowired
	MaestraDao maestraDao;

	@Override
	public OutResponse<List<Maestra>> listarMaestra(MaestraBuscar c) {
		return maestraDao.listarMaestra(c);
	}
}
