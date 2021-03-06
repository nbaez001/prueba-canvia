CREATE TABLESPACE PRUEBA DATAFILE 'PRUEBA.DBF' SIZE 10M AUTOEXTEND ON NEXT 1M;
CREATE USER PRUEBA IDENTIFIED BY 1234 DEFAULT TABLESPACE PRUEBA;
GRANT CONNECT,RESOURCE,DBA TO PRUEBA;

CONNECT PRUEBA/1234@localhost/XE;

CREATE TABLE MAESTRA(
    ID INTEGER NOT NULL PRIMARY KEY,
    ID_MAESTRA INTEGER NULL,
    ID_TABLA NUMBER(10) NOT NULL,
    ID_ITEM NUMBER(10) NOT NULL,
    ORDEN NUMBER(10) NOT NULL,
    CODIGO VARCHAR(10) NOT NULL,
    NOMBRE VARCHAR(50) NOT NULL,
    VALOR VARCHAR(100) NULL,
    FLAG_ACTIVO NUMBER(1) NOT NULL,
	DESCRIPCION VARCHAR(250) NULL,
    ID_USUARIO_CREA INTEGER NOT NULL,
    FEC_USUARIO_CREA DATE NOT NULL,
    ID_USUARIO_MOD INTEGER NULL,
    FEC_USUARIO_MOD DATE NULL
);

CREATE TABLE CLIENTE(
    ID INTEGER NOT NULL PRIMARY KEY,
    NOMBRE VARCHAR2(100) NULL,
	APELLIDO_PAT VARCHAR2(100) NULL,
	APELLIDO_MAT VARCHAR2(100) NULL,
    IDT_TIPO_DOCUMENTO NUMBER(10) NULL,
    NRO_DOCUMENTO VARCHAR(15) NULL,
    FLAG_ACTIVO NUMBER(1) NOT NULL,
    ID_USUARIO_CREA INTEGER NOT NULL,
    FEC_USUARIO_CREA DATE NOT NULL,
    ID_USUARIO_MOD INTEGER NULL,
    FEC_USUARIO_MOD DATE NULL
);

CREATE SEQUENCE SEQ_CLIENTE
  MINVALUE 1
  MAXVALUE 999999999999999999999999999
  START WITH 1
  INCREMENT BY 1
  CACHE 20;
  
CREATE TABLE FACTURA(
    ID INTEGER NOT NULL PRIMARY KEY,
    NRO_COMPROBANTE VARCHAR2(13) NULL,
	MONTO NUMBER(10,2) NULL,
	FECHA DATE NULL,
    FLAG_ACTIVO NUMBER(1) NOT NULL,
    ID_USUARIO_CREA INTEGER NOT NULL,
    FEC_USUARIO_CREA DATE NOT NULL,
    ID_USUARIO_MOD INTEGER NULL,
    FEC_USUARIO_MOD DATE NULL
);

CREATE SEQUENCE SEQ_FACTURA
  MINVALUE 1
  MAXVALUE 999999999999999999999999999
  START WITH 1
  INCREMENT BY 1
  CACHE 20;

CREATE TABLE CLIENTE_FACTURA(
    ID INTEGER NOT NULL PRIMARY KEY,
    ID_CLIENTE NUMBER(38) NOT NULL,
    ID_FACTURA NUMBER(38) NOT NULL,
	FLAG_ACTIVO NUMBER(1) NOT NULL,
    ID_USUARIO_CREA INTEGER NOT NULL,
    FEC_USUARIO_CREA DATE NOT NULL,
    ID_USUARIO_MOD INTEGER NULL,
    FEC_USUARIO_MOD DATE NULL,
	FOREIGN KEY (ID_CLIENTE) REFERENCES CLIENTE (ID),
	FOREIGN KEY (ID_FACTURA) REFERENCES FACTURA (ID)
);

CREATE SEQUENCE SEQ_CLIENTE_FACTURA
  MINVALUE 1
  MAXVALUE 999999999999999999999999999
  START WITH 1
  INCREMENT BY 1
  CACHE 20;

CREATE TABLE FACTURA_DETALLE(
    ID INTEGER NOT NULL PRIMARY KEY,
	ID_FACTURA NUMBER(38) NOT NULL,
    PRECIO NUMBER(10,2) NOT NULL,
	CANTIDAD NUMBER(10,2) NOT NULL,
	SUBTOTAL NUMBER(10,2) NOT NULL,
    FLAG_ACTIVO NUMBER(1) NOT NULL,
    ID_USUARIO_CREA INTEGER NOT NULL,
    FEC_USUARIO_CREA DATE NOT NULL,
    ID_USUARIO_MOD INTEGER NULL,
    FEC_USUARIO_MOD DATE NULL,
	FOREIGN KEY (ID_FACTURA) REFERENCES FACTURA (ID)
);

CREATE SEQUENCE SEQ_FACTURA_DETALLE
  MINVALUE 1
  MAXVALUE 999999999999999999999999999
  START WITH 1
  INCREMENT BY 1
  CACHE 20;
  
CREATE TABLE ITEM_DETALLE(
    ID INTEGER NOT NULL PRIMARY KEY,
	ID_FACTURA_DETALLE NUMBER(38) NULL,
    CODIGO VARCHAR2(100) NULL,
    NOMBRE VARCHAR2(100) NULL,
	FLAG_ACTIVO NUMBER(1) NOT NULL,
    ID_USUARIO_CREA INTEGER NOT NULL,
    FEC_USUARIO_CREA DATE NOT NULL,
    ID_USUARIO_MOD INTEGER NULL,
    FEC_USUARIO_MOD DATE NULL,
	FOREIGN KEY (ID_FACTURA_DETALLE) REFERENCES FACTURA_DETALLE (ID)
);

CREATE SEQUENCE SEQ_ITEM_DETALLE
  MINVALUE 1
  MAXVALUE 999999999999999999999999999
  START WITH 1
  INCREMENT BY 1
  CACHE 20;

INSERT INTO MAESTRA (ID,ID_MAESTRA,ID_TABLA,ID_ITEM,ORDEN,CODIGO,NOMBRE,VALOR,FLAG_ACTIVO,DESCRIPCION,ID_USUARIO_CREA,FEC_USUARIO_CREA,ID_USUARIO_MOD,FEC_USUARIO_MOD) VALUES ('27','0','106','0','0','TDI','TIPO DOCUMENTO IDENTIDAD',NULL,'1','CODIGOS DE TIPOS DE DOCUMENTOS DE IDENTIDAD','1',TO_DATE('31/07/20','DD/MM/RR'),NULL,NULL);
INSERT INTO MAESTRA (ID,ID_MAESTRA,ID_TABLA,ID_ITEM,ORDEN,CODIGO,NOMBRE,VALOR,FLAG_ACTIVO,DESCRIPCION,ID_USUARIO_CREA,FEC_USUARIO_CREA,ID_USUARIO_MOD,FEC_USUARIO_MOD) VALUES ('61','27','106','1','3','0','DOC.TRIB.NO.DOM.SIN.RUC',NULL,'1','DOC.TRIB.NO.DOM.SIN.RUC','1',TO_DATE('31/07/20','DD/MM/RR'),'1',TO_DATE('31/07/20','DD/MM/RR'));
INSERT INTO MAESTRA (ID,ID_MAESTRA,ID_TABLA,ID_ITEM,ORDEN,CODIGO,NOMBRE,VALOR,FLAG_ACTIVO,DESCRIPCION,ID_USUARIO_CREA,FEC_USUARIO_CREA,ID_USUARIO_MOD,FEC_USUARIO_MOD) VALUES ('62','27','106','2','1','1','DNI',NULL,'1','DOC. NACIONAL DE IDENTIDAD','1',TO_DATE('31/07/20','DD/MM/RR'),NULL,NULL);
INSERT INTO MAESTRA (ID,ID_MAESTRA,ID_TABLA,ID_ITEM,ORDEN,CODIGO,NOMBRE,VALOR,FLAG_ACTIVO,DESCRIPCION,ID_USUARIO_CREA,FEC_USUARIO_CREA,ID_USUARIO_MOD,FEC_USUARIO_MOD) VALUES ('63','27','106','3','4','4','CARNET EXTRANGERIA',NULL,'1','CARNET DE EXTRANGERIA','1',TO_DATE('31/07/20','DD/MM/RR'),NULL,NULL);
INSERT INTO MAESTRA (ID,ID_MAESTRA,ID_TABLA,ID_ITEM,ORDEN,CODIGO,NOMBRE,VALOR,FLAG_ACTIVO,DESCRIPCION,ID_USUARIO_CREA,FEC_USUARIO_CREA,ID_USUARIO_MOD,FEC_USUARIO_MOD) VALUES ('64','27','106','4','2','6','RUC',NULL,'1','REGISTRO UNICO DE CONTRIBUYENTES','1',TO_DATE('31/07/20','DD/MM/RR'),NULL,NULL);
INSERT INTO MAESTRA (ID,ID_MAESTRA,ID_TABLA,ID_ITEM,ORDEN,CODIGO,NOMBRE,VALOR,FLAG_ACTIVO,DESCRIPCION,ID_USUARIO_CREA,FEC_USUARIO_CREA,ID_USUARIO_MOD,FEC_USUARIO_MOD) VALUES ('65','27','106','5','5','7','PASAPORTE',NULL,'1','PASAPORTE','1',TO_DATE('31/07/20','DD/MM/RR'),NULL,NULL);
COMMIT;


create or replace PACKAGE PCK_CLIENTE AS

	C_TABLA_TIPO_DOCUMENTO NUMBER(10) := 106;

	PROCEDURE SP_I_CLIENTE (
        P_NOMBRE           	  IN      VARCHAR2,
		P_APELLIDO_PAT     	  IN      VARCHAR2,
        P_APELLIDO_MAT     	  IN      VARCHAR2,
		P_IDT_TIPO_DOCUMENTO  IN      NUMBER,
		P_NRO_DOCUMENTO    	  IN      VARCHAR2,
        P_ID_USUARIO_CREA     IN      NUMBER,
		R_ID                  OUT     NUMBER,
        R_CODIGO              OUT     NUMBER,
        R_MENSAJE             OUT     VARCHAR2
    );

    PROCEDURE SP_L_CLIENTE (
        P_NOMBRE        IN  VARCHAR2,
		P_FLAG_ACTIVO	IN 	NUMBER,
        R_LISTA     	OUT SYS_REFCURSOR,
        R_CODIGO    	OUT NUMBER,
        R_MENSAJE   	OUT VARCHAR2
    );

    PROCEDURE SP_U_CLIENTE (
		P_ID                  IN      NUMBER,
        P_NOMBRE           	  IN      VARCHAR2,
		P_APELLIDO_PAT     	  IN      VARCHAR2,
        P_APELLIDO_MAT     	  IN      VARCHAR2,
		P_IDT_TIPO_DOCUMENTO  IN      NUMBER,
		P_NRO_DOCUMENTO    	  IN      VARCHAR2,
        P_ID_USUARIO_MOD      IN      NUMBER,
        R_CODIGO              OUT     NUMBER,
        R_MENSAJE             OUT     VARCHAR2
    );

    PROCEDURE SP_D_CLIENTE_LOGICA (
        P_ID                  IN      NUMBER,
        R_CODIGO              OUT     NUMBER,
        R_MENSAJE             OUT     VARCHAR2
    );
	
	PROCEDURE SP_D_CLIENTE (
        P_ID                  IN      NUMBER,
        R_CODIGO              OUT     NUMBER,
        R_MENSAJE             OUT     VARCHAR2
    );
	
	PROCEDURE SP_S_CLIENTE (
		P_ID					IN 	NUMBER,
        R_NOMBRE        		OUT VARCHAR2,
		R_APELLIDO_PAT  		OUT VARCHAR2,
		R_APELLIDO_MAT  		OUT VARCHAR2,
		R_IDT_TIPO_DOCUMENTO  	OUT NUMBER,
		R_DES_TIPO_DOCUMENTO  	OUT VARCHAR2,
		R_NRO_DOCUMENTO        	OUT VARCHAR2,
		R_FLAG_ACTIVO			OUT	NUMBER,
        R_CODIGO    			OUT NUMBER,
        R_MENSAJE   			OUT VARCHAR2
    );
	
	PROCEDURE SP_L_CLIENTE_PAGINADO (
        P_NOMBRE        IN  VARCHAR2,
		P_FLAG_ACTIVO	IN 	NUMBER,
		P_INDEX			IN 	NUMBER,
		P_SIZE			IN 	NUMBER,
        R_LISTA     	OUT SYS_REFCURSOR,
		R_SIZE			OUT	NUMBER,
        R_CODIGO    	OUT NUMBER,
        R_MENSAJE   	OUT VARCHAR2
    );
	
	PROCEDURE SP_L_MAESTRA (
        N_ID_TABLA     IN    NUMBER,
        R_LISTA        OUT   SYS_REFCURSOR,
        R_CODIGO       OUT   NUMBER,
        R_MENSAJE      OUT   VARCHAR2
    );

END PCK_CLIENTE;
/
create or replace PACKAGE BODY PCK_CLIENTE AS

	PROCEDURE SP_I_CLIENTE (
        P_NOMBRE           	  IN      VARCHAR2,
		P_APELLIDO_PAT     	  IN      VARCHAR2,
        P_APELLIDO_MAT     	  IN      VARCHAR2,
		P_IDT_TIPO_DOCUMENTO  IN      NUMBER,
		P_NRO_DOCUMENTO    	  IN      VARCHAR2,
        P_ID_USUARIO_CREA     IN      NUMBER,
		R_ID                  OUT     NUMBER,
        R_CODIGO              OUT     NUMBER,
        R_MENSAJE             OUT     VARCHAR2
    ) AS
    BEGIN
        SELECT SEQ_CLIENTE.NEXTVAL INTO R_ID FROM DUAL;
		
		INSERT INTO CLIENTE(
		ID,
		NOMBRE,
		APELLIDO_PAT,
		APELLIDO_MAT,
		IDT_TIPO_DOCUMENTO,
		NRO_DOCUMENTO,
		FLAG_ACTIVO,
		ID_USUARIO_CREA,
		FEC_USUARIO_CREA) 
		VALUES (
		R_ID,
		P_NOMBRE,
		P_APELLIDO_PAT,
		P_APELLIDO_MAT,
		P_IDT_TIPO_DOCUMENTO,
		P_NRO_DOCUMENTO,
		1,
		P_ID_USUARIO_CREA,
		SYSDATE);
        COMMIT;

        R_CODIGO := SQLCODE;
        R_MENSAJE := SQLERRM;
    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            R_CODIGO := SQLCODE;
            R_MENSAJE := SQLERRM;
	END SP_I_CLIENTE;

    PROCEDURE SP_L_CLIENTE (
        P_NOMBRE        IN  VARCHAR2,
		P_FLAG_ACTIVO	IN 	NUMBER,
        R_LISTA     	OUT SYS_REFCURSOR,
        R_CODIGO    	OUT NUMBER,
        R_MENSAJE   	OUT VARCHAR2
    ) AS
        V_SQL VARCHAR2(3000);
    BEGIN
        V_SQL := 'SELECT 
        P.ID,
        P.NOMBRE,
        P.APELLIDO_PAT,
        P.APELLIDO_MAT,
        P.IDT_TIPO_DOCUMENTO,
		(SELECT M.NOMBRE FROM MAESTRA M WHERE M.ID_ITEM=P.IDT_TIPO_DOCUMENTO AND M.ID_TABLA='||PCK_CLIENTE.C_TABLA_TIPO_DOCUMENTO||') AS DES_TIPO_DOCUMENTO,
        P.NRO_DOCUMENTO
        FROM CLIENTE P
        WHERE 1=1';

        IF ( P_NOMBRE IS NOT NULL ) THEN
            V_SQL := V_SQL || ' AND P.NOMBRE LIKE ''%' || P_NOMBRE || '%''';
        END IF;
		
		IF ( P_FLAG_ACTIVO IS NOT NULL ) THEN
            V_SQL := V_SQL || ' AND P.FLAG_ACTIVO =' || P_FLAG_ACTIVO;
        END IF;

        V_SQL := V_SQL||' ORDER BY P.FLAG_ACTIVO DESC, P.NOMBRE ASC, P.ID DESC';

        OPEN R_LISTA FOR V_SQL;

        R_CODIGO := SQLCODE;
        R_MENSAJE := SQLERRM;
    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            R_CODIGO := SQLCODE;
            R_MENSAJE := SQLERRM;
    END SP_L_CLIENTE;

    PROCEDURE SP_U_CLIENTE (
		P_ID                  IN      NUMBER,
        P_NOMBRE           	  IN      VARCHAR2,
		P_APELLIDO_PAT     	  IN      VARCHAR2,
        P_APELLIDO_MAT     	  IN      VARCHAR2,
		P_IDT_TIPO_DOCUMENTO  IN      NUMBER,
		P_NRO_DOCUMENTO    	  IN      VARCHAR2,
        P_ID_USUARIO_MOD      IN      NUMBER,
        R_CODIGO              OUT     NUMBER,
        R_MENSAJE             OUT     VARCHAR2
    ) AS
    BEGIN
        UPDATE CLIENTE SET 
		NOMBRE=P_NOMBRE,
		APELLIDO_PAT=P_APELLIDO_PAT,
		APELLIDO_MAT=P_APELLIDO_MAT,
		IDT_TIPO_DOCUMENTO=P_IDT_TIPO_DOCUMENTO,
		NRO_DOCUMENTO=P_NRO_DOCUMENTO,
		ID_USUARIO_MOD=P_ID_USUARIO_MOD, 
		FEC_USUARIO_MOD=SYSDATE
        WHERE ID=P_ID;
		COMMIT;

        R_CODIGO := SQLCODE;
        R_MENSAJE := SQLERRM;
    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            R_CODIGO := SQLCODE;
            R_MENSAJE := SQLERRM;
	END SP_U_CLIENTE;

    PROCEDURE SP_D_CLIENTE_LOGICA (
        P_ID                  IN      NUMBER,
        R_CODIGO              OUT     NUMBER,
        R_MENSAJE             OUT     VARCHAR2
    ) AS
    BEGIN
        UPDATE CLIENTE SET FLAG_ACTIVO=0 WHERE ID=P_ID;
        COMMIT;

        R_CODIGO := SQLCODE;
        R_MENSAJE := SQLERRM;
    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            R_CODIGO := SQLCODE;
            R_MENSAJE := SQLERRM;
	END SP_D_CLIENTE_LOGICA;
	
	PROCEDURE SP_D_CLIENTE (
        P_ID                  IN      NUMBER,
        R_CODIGO              OUT     NUMBER,
        R_MENSAJE             OUT     VARCHAR2
    ) AS
    BEGIN
        DELETE FROM CLIENTE WHERE ID=P_ID;
        COMMIT;

        R_CODIGO := SQLCODE;
        R_MENSAJE := SQLERRM;
    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            R_CODIGO := SQLCODE;
            R_MENSAJE := SQLERRM;
	END SP_D_CLIENTE;
	
	PROCEDURE SP_S_CLIENTE (
		P_ID					IN 	NUMBER,
        R_NOMBRE        		OUT VARCHAR2,
		R_APELLIDO_PAT  		OUT VARCHAR2,
		R_APELLIDO_MAT  		OUT VARCHAR2,
		R_IDT_TIPO_DOCUMENTO  	OUT NUMBER,
		R_DES_TIPO_DOCUMENTO  	OUT VARCHAR2,
		R_NRO_DOCUMENTO        	OUT VARCHAR2,
		R_FLAG_ACTIVO			OUT	NUMBER,
        R_CODIGO    			OUT NUMBER,
        R_MENSAJE   			OUT VARCHAR2
    ) AS
    BEGIN
        SELECT 
        P.NOMBRE,
        P.APELLIDO_PAT,
        P.APELLIDO_MAT,
        P.IDT_TIPO_DOCUMENTO,
		(SELECT M.NOMBRE FROM MAESTRA M WHERE M.ID_ITEM=P.IDT_TIPO_DOCUMENTO AND M.ID_TABLA=PCK_CLIENTE.C_TABLA_TIPO_DOCUMENTO) AS DES_TIPO_DOCUMENTO,
        P.NRO_DOCUMENTO,
		P.FLAG_ACTIVO
		INTO
		R_NOMBRE,
		R_APELLIDO_PAT,
		R_APELLIDO_MAT,
		R_IDT_TIPO_DOCUMENTO,
		R_DES_TIPO_DOCUMENTO,
		R_NRO_DOCUMENTO,
		R_FLAG_ACTIVO
        FROM CLIENTE P
        WHERE P.ID=P_ID;

        R_CODIGO := SQLCODE;
        R_MENSAJE := SQLERRM;
    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            R_CODIGO := SQLCODE;
            R_MENSAJE := SQLERRM;
    END SP_S_CLIENTE;
	
	PROCEDURE SP_L_CLIENTE_PAGINADO (
        P_NOMBRE        IN  VARCHAR2,
		P_FLAG_ACTIVO	IN 	NUMBER,
		P_INDEX			IN 	NUMBER,
		P_SIZE			IN 	NUMBER,
        R_LISTA     	OUT SYS_REFCURSOR,
		R_SIZE			OUT	NUMBER,
        R_CODIGO    	OUT NUMBER,
        R_MENSAJE   	OUT VARCHAR2
    ) AS
        V_SQL 		VARCHAR2(3000);
		V_SQL2 		VARCHAR2(3000);
		V_SQL3 		VARCHAR2(3000);
    BEGIN
        V_SQL := 'SELECT 
        P.ID,
        P.NOMBRE,
        P.APELLIDO_PAT,
        P.APELLIDO_MAT,
        P.IDT_TIPO_DOCUMENTO,
		(SELECT M.NOMBRE FROM MAESTRA M WHERE M.ID_ITEM=P.IDT_TIPO_DOCUMENTO AND M.ID_TABLA='||PCK_CLIENTE.C_TABLA_TIPO_DOCUMENTO||') AS DES_TIPO_DOCUMENTO,
        P.NRO_DOCUMENTO
        FROM CLIENTE P
        WHERE 1=1';

        IF ( P_NOMBRE IS NOT NULL ) THEN
            V_SQL := V_SQL || ' AND P.NOMBRE LIKE ''%' || P_NOMBRE || '%''';
        END IF;
		
		IF ( P_FLAG_ACTIVO IS NOT NULL ) THEN
            V_SQL := V_SQL || ' AND P.FLAG_ACTIVO =' || P_FLAG_ACTIVO;
        END IF;

        V_SQL := V_SQL||' ORDER BY P.FLAG_ACTIVO DESC, P.NOMBRE ASC, P.ID DESC';
		
		V_SQL2 := 'SELECT COUNT(1) FROM ('||V_SQL||')';
		DBMS_OUTPUT.PUT_LINE(V_SQL2);
		EXECUTE IMMEDIATE V_SQL2 INTO R_SIZE;
        
		V_SQL3 := 'SELECT * FROM (SELECT A.*, ROWNUM RNUM FROM ('||V_SQL||') A WHERE ROWNUM <= '||((P_INDEX+1)*P_SIZE)||') WHERE RNUM > '||(P_INDEX*P_SIZE);
		DBMS_OUTPUT.PUT_LINE(V_SQL3);
		OPEN R_LISTA FOR V_SQL3;

        R_CODIGO := SQLCODE;
        R_MENSAJE := SQLERRM;
    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            R_CODIGO := SQLCODE;
            R_MENSAJE := SQLERRM;
    END SP_L_CLIENTE_PAGINADO;
	
	PROCEDURE SP_L_MAESTRA (
        N_ID_TABLA     IN    NUMBER,
        R_LISTA        OUT   SYS_REFCURSOR,
        R_CODIGO       OUT   NUMBER,
        R_MENSAJE      OUT   VARCHAR2
    ) AS
    BEGIN
		OPEN R_LISTA FOR
			SELECT 
			ID_ITEM,
			ID_TABLA,
			CODIGO,
			NOMBRE,
			DESCRIPCION
			FROM MAESTRA M 
			WHERE M.ID_TABLA=N_ID_TABLA AND M.ID_MAESTRA!=0
			ORDER BY ORDEN ASC, ID_TABLA DESC;

        R_CODIGO := SQLCODE;
        R_MENSAJE := SQLERRM;
    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            R_CODIGO := SQLCODE;
            R_MENSAJE := SQLERRM;
    END SP_L_MAESTRA;

END PCK_CLIENTE;
/
create or replace PACKAGE PCK_FACTURA AS

	PROCEDURE SP_I_FACTURA (
        P_NRO_COMPROBANTE  	  IN      VARCHAR2,
		P_MONTO     	  	  IN      NUMBER,
        P_FECHA     	  	  IN      VARCHAR2,
		P_ID_CLIENTE  		  IN      NUMBER,
        P_ID_USUARIO_CREA     IN      NUMBER,
		R_ID                  OUT     NUMBER,
        R_CODIGO              OUT     NUMBER,
        R_MENSAJE             OUT     VARCHAR2
    );
	
	PROCEDURE SP_I_FACTURA_DETALLE (
		P_ID_FACTURA  		  IN      NUMBER,
        P_PRECIO  	  		  IN      NUMBER,
		P_CANTIDAD     	  	  IN      NUMBER,
        P_SUBTOTAL     	  	  IN      VARCHAR2,
		P_CODIGO  		  	  IN      VARCHAR2,
        P_NOMBRE     		  IN      VARCHAR2,
		P_ID_USUARIO_CREA	  IN 	  NUMBER,
        R_CODIGO              OUT     NUMBER,
        R_MENSAJE             OUT     VARCHAR2
    );

    PROCEDURE SP_L_FACTURA (
        R_LISTA     	OUT SYS_REFCURSOR,
        R_CODIGO    	OUT NUMBER,
        R_MENSAJE   	OUT VARCHAR2
    );

    PROCEDURE SP_U_FACTURA (
		P_ID                  IN      NUMBER,
        P_NRO_COMPROBANTE  	  IN      VARCHAR2,
		P_MONTO     	  	  IN      NUMBER,
        P_FECHA     	  	  IN      VARCHAR2,
		P_ID_CLIENTE  		  IN      NUMBER,
        P_ID_USUARIO_MOD      IN      NUMBER,
        R_CODIGO              OUT     NUMBER,
        R_MENSAJE             OUT     VARCHAR2
    );
	
	PROCEDURE SP_U_FACTURA_DETALLE (
		P_ID                  IN      NUMBER,
        P_PRECIO  	  		  IN      NUMBER,
		P_CANTIDAD     	  	  IN      NUMBER,
		P_SUBTOTAL     	  	  IN      NUMBER,
        P_CODIGO     	  	  IN      VARCHAR2,
		P_NOMBRE  		  	  IN      VARCHAR2,
        P_ID_USUARIO_MOD      IN      NUMBER,
        R_CODIGO              OUT     NUMBER,
        R_MENSAJE             OUT     VARCHAR2
    );

    PROCEDURE SP_D_FACTURA_LOGICA (
        P_ID                  IN      NUMBER,
        R_CODIGO              OUT     NUMBER,
        R_MENSAJE             OUT     VARCHAR2
    );
	
	PROCEDURE SP_D_FACTURA (
        P_ID                  IN      NUMBER,
        R_CODIGO              OUT     NUMBER,
        R_MENSAJE             OUT     VARCHAR2
    );
	
	PROCEDURE SP_S_FACTURA (
		P_ID					IN 	NUMBER,
        R_NRO_COMPROBANTE  		OUT VARCHAR2,
		R_MONTO  				OUT NUMBER,
		R_FECHA  				OUT DATE,
		R_NOM_CLIENTE  			OUT VARCHAR2,
		R_ID_CLIENTE  			OUT NUMBER,
		R_LISTA     			OUT SYS_REFCURSOR,
        R_CODIGO    			OUT NUMBER,
        R_MENSAJE   			OUT VARCHAR2
    );
	
	PROCEDURE SP_L_FACTURA_PAGINADO (
        P_NRO_COMPROBANTE   IN  VARCHAR2,
		P_FLAG_ACTIVO		IN 	NUMBER,
		P_INDEX				IN 	NUMBER,
		P_SIZE				IN 	NUMBER,
        R_LISTA     		OUT SYS_REFCURSOR,
		R_SIZE				OUT	NUMBER,
        R_CODIGO    		OUT NUMBER,
        R_MENSAJE   		OUT VARCHAR2
    );

END PCK_FACTURA;
/
create or replace PACKAGE BODY PCK_FACTURA AS

	PROCEDURE SP_I_FACTURA (
        P_NRO_COMPROBANTE  	  IN      VARCHAR2,
		P_MONTO     	  	  IN      NUMBER,
        P_FECHA     	  	  IN      VARCHAR2,
		P_ID_CLIENTE  		  IN      NUMBER,
        P_ID_USUARIO_CREA     IN      NUMBER,
		R_ID                  OUT     NUMBER,
        R_CODIGO              OUT     NUMBER,
        R_MENSAJE             OUT     VARCHAR2
    ) AS
    BEGIN
        SELECT SEQ_FACTURA.NEXTVAL INTO R_ID FROM DUAL;
		
		INSERT INTO FACTURA(
		ID,
		NRO_COMPROBANTE,
		MONTO,
		FECHA,
		FLAG_ACTIVO,
		ID_USUARIO_CREA,
		FEC_USUARIO_CREA) 
		VALUES (
		R_ID,
		P_NRO_COMPROBANTE,
		P_MONTO,
		TO_DATE(P_FECHA,'DD/MM/YYYY'),
		1,
		P_ID_USUARIO_CREA,
		SYSDATE);
		
		INSERT INTO CLIENTE_FACTURA(
		ID,
		ID_CLIENTE,
		ID_FACTURA,
		FLAG_ACTIVO,
		ID_USUARIO_CREA,
		FEC_USUARIO_CREA) 
		VALUES (
		SEQ_CLIENTE_FACTURA.NEXTVAL,
		P_ID_CLIENTE,
		R_ID,
		1,
		P_ID_USUARIO_CREA,
		SYSDATE);

        R_CODIGO := SQLCODE;
        R_MENSAJE := SQLERRM;
    EXCEPTION
        WHEN OTHERS THEN
            R_CODIGO := SQLCODE;
            R_MENSAJE := SQLERRM;
	END SP_I_FACTURA;
	
	PROCEDURE SP_I_FACTURA_DETALLE (
		P_ID_FACTURA  		  IN      NUMBER,
        P_PRECIO  	  		  IN      NUMBER,
		P_CANTIDAD     	  	  IN      NUMBER,
        P_SUBTOTAL     	  	  IN      VARCHAR2,
		P_CODIGO  		  	  IN      VARCHAR2,
        P_NOMBRE     		  IN      VARCHAR2,
		P_ID_USUARIO_CREA	  IN 	  NUMBER,
        R_CODIGO              OUT     NUMBER,
        R_MENSAJE             OUT     VARCHAR2
    ) AS
		V_ID_DETALLE	NUMBER;
    BEGIN
        SELECT SEQ_FACTURA_DETALLE.NEXTVAL INTO V_ID_DETALLE FROM DUAL;
		
		INSERT INTO FACTURA_DETALLE(
		ID,
		ID_FACTURA,
		PRECIO,
		CANTIDAD,
		SUBTOTAL,
		FLAG_ACTIVO,
		ID_USUARIO_CREA,
		FEC_USUARIO_CREA) 
		VALUES (
		V_ID_DETALLE,
		P_ID_FACTURA,
		P_PRECIO,
		P_CANTIDAD,
		P_SUBTOTAL,
		1,
		P_ID_USUARIO_CREA,
		SYSDATE);
		
		INSERT INTO ITEM_DETALLE(
		ID,
		ID_FACTURA_DETALLE,
		CODIGO,
		NOMBRE,
		FLAG_ACTIVO,
		ID_USUARIO_CREA,
		FEC_USUARIO_CREA) 
		VALUES (
		SEQ_ITEM_DETALLE.NEXTVAL,
		V_ID_DETALLE,
		P_CODIGO,
		P_NOMBRE,
		1,
		P_ID_USUARIO_CREA,
		SYSDATE);

        R_CODIGO := SQLCODE;
        R_MENSAJE := SQLERRM;
    EXCEPTION
        WHEN OTHERS THEN
            R_CODIGO := SQLCODE;
            R_MENSAJE := SQLERRM;
	END SP_I_FACTURA_DETALLE;

    PROCEDURE SP_L_FACTURA (
        R_LISTA     	OUT SYS_REFCURSOR,
        R_CODIGO    	OUT NUMBER,
        R_MENSAJE   	OUT VARCHAR2
    ) AS
    BEGIN
        OPEN R_LISTA FOR
			SELECT 
			P.ID,
			P.NRO_COMPROBANTE,
			P.MONTO,
			P.FECHA,
			M.NOMBRE||' '||M.APELLIDO_PAT||' '||M.APELLIDO_MAT AS NOM_CLIENTE,
			M.ID AS ID_CLIENTE,
			P.FLAG_ACTIVO
			FROM FACTURA P
			INNER JOIN CLIENTE_FACTURA CF ON CF.ID_FACTURA=P.ID
			INNER JOIN CLIENTE M ON M.ID=CF.ID_CLIENTE;

        R_CODIGO := SQLCODE;
        R_MENSAJE := SQLERRM;
    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            R_CODIGO := SQLCODE;
            R_MENSAJE := SQLERRM;
    END SP_L_FACTURA;

    PROCEDURE SP_U_FACTURA (
		P_ID                  IN      NUMBER,
        P_NRO_COMPROBANTE  	  IN      VARCHAR2,
		P_MONTO     	  	  IN      NUMBER,
        P_FECHA     	  	  IN      VARCHAR2,
		P_ID_CLIENTE  		  IN      NUMBER,
        P_ID_USUARIO_MOD      IN      NUMBER,
        R_CODIGO              OUT     NUMBER,
        R_MENSAJE             OUT     VARCHAR2
    ) AS
    BEGIN
        UPDATE FACTURA SET 
		NRO_COMPROBANTE=P_NRO_COMPROBANTE,
		MONTO=P_MONTO,
		FECHA=TO_DATE(P_FECHA,'DD/MM/YYYY'),
		ID_USUARIO_MOD=P_ID_USUARIO_MOD, 
		FEC_USUARIO_MOD=SYSDATE
        WHERE ID=P_ID;
		
		UPDATE CLIENTE_FACTURA SET 
		ID_CLIENTE=P_ID_CLIENTE,
		ID_USUARIO_MOD=P_ID_USUARIO_MOD, 
		FEC_USUARIO_MOD=SYSDATE
        WHERE ID_FACTURA=P_ID;
		
		UPDATE FACTURA_DETALLE
		SET FLAG_ACTIVO=0
		WHERE ID_FACTURA=P_ID;
		
		UPDATE ITEM_DETALLE
		SET FLAG_ACTIVO=0
		WHERE ID_FACTURA_DETALLE IN (
			SELECT FD.ID 
			FROM FACTURA_DETALLE FD
			WHERE FD.ID_FACTURA=P_ID
		);

        R_CODIGO := SQLCODE;
        R_MENSAJE := SQLERRM;
    EXCEPTION
        WHEN OTHERS THEN
            R_CODIGO := SQLCODE;
            R_MENSAJE := SQLERRM;
	END SP_U_FACTURA;
	
	PROCEDURE SP_U_FACTURA_DETALLE (
		P_ID                  IN      NUMBER,
        P_PRECIO  	  		  IN      NUMBER,
		P_CANTIDAD     	  	  IN      NUMBER,
		P_SUBTOTAL     	  	  IN      NUMBER,
        P_CODIGO     	  	  IN      VARCHAR2,
		P_NOMBRE  		  	  IN      VARCHAR2,
        P_ID_USUARIO_MOD      IN      NUMBER,
        R_CODIGO              OUT     NUMBER,
        R_MENSAJE             OUT     VARCHAR2
    ) AS
    BEGIN
        UPDATE FACTURA_DETALLE SET 
		PRECIO=P_PRECIO,
		CANTIDAD=P_CANTIDAD,
		SUBTOTAL=P_SUBTOTAL,
		FLAG_ACTIVO=1,
		ID_USUARIO_MOD=P_ID_USUARIO_MOD, 
		FEC_USUARIO_MOD=SYSDATE
        WHERE ID=P_ID;
		
		UPDATE ITEM_DETALLE SET 
		CODIGO=P_CODIGO,
		NOMBRE=P_NOMBRE,
		FLAG_ACTIVO=1,
		ID_USUARIO_MOD=P_ID_USUARIO_MOD, 
		FEC_USUARIO_MOD=SYSDATE
        WHERE ID_FACTURA_DETALLE=P_ID;

        R_CODIGO := SQLCODE;
        R_MENSAJE := SQLERRM;
    EXCEPTION
        WHEN OTHERS THEN
            R_CODIGO := SQLCODE;
            R_MENSAJE := SQLERRM;
	END SP_U_FACTURA_DETALLE;

    PROCEDURE SP_D_FACTURA_LOGICA (
        P_ID                  IN      NUMBER,
        R_CODIGO              OUT     NUMBER,
        R_MENSAJE             OUT     VARCHAR2
    ) AS
    BEGIN
        UPDATE FACTURA SET FLAG_ACTIVO=0 WHERE ID=P_ID;
		
		UPDATE FACTURA_DETALLE
		SET FLAG_ACTIVO=0
		WHERE ID_FACTURA=P_ID;
		
		UPDATE ITEM_DETALLE
		SET FLAG_ACTIVO=0
		WHERE ID_FACTURA_DETALLE IN (
			SELECT FD.ID 
			FROM FACTURA_DETALLE FD
			WHERE FD.ID_FACTURA=P_ID
		);
        COMMIT;

        R_CODIGO := SQLCODE;
        R_MENSAJE := SQLERRM;
    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            R_CODIGO := SQLCODE;
            R_MENSAJE := SQLERRM;
	END SP_D_FACTURA_LOGICA;
	
	PROCEDURE SP_D_FACTURA (
        P_ID                  IN      NUMBER,
        R_CODIGO              OUT     NUMBER,
        R_MENSAJE             OUT     VARCHAR2
    ) AS
    BEGIN
		DELETE FROM ITEM_DETALLE
		WHERE ID_FACTURA_DETALLE IN (
			SELECT FD.ID 
			FROM FACTURA_DETALLE FD
			WHERE FD.ID_FACTURA=P_ID
		);
		
		DELETE FROM FACTURA_DETALLE
		WHERE ID_FACTURA=P_ID;
		
        DELETE FROM FACTURA WHERE ID=P_ID;
        COMMIT;

        R_CODIGO := SQLCODE;
        R_MENSAJE := SQLERRM;
    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            R_CODIGO := SQLCODE;
            R_MENSAJE := SQLERRM;
	END SP_D_FACTURA;
	
	PROCEDURE SP_S_FACTURA (
		P_ID					IN 	NUMBER,
        R_NRO_COMPROBANTE  		OUT VARCHAR2,
		R_MONTO  				OUT NUMBER,
		R_FECHA  				OUT DATE,
		R_NOM_CLIENTE  			OUT VARCHAR2,
		R_ID_CLIENTE  			OUT NUMBER,
		R_LISTA     			OUT SYS_REFCURSOR,
        R_CODIGO    			OUT NUMBER,
        R_MENSAJE   			OUT VARCHAR2
    ) AS
    BEGIN
		SELECT 
		P.NRO_COMPROBANTE,
		P.MONTO,
		P.FECHA,
		M.NOMBRE||' '||M.APELLIDO_PAT||' '||M.APELLIDO_MAT AS NOM_CLIENTE,
		M.ID
		INTO
		R_NRO_COMPROBANTE,
		R_MONTO,
		R_FECHA,
		R_NOM_CLIENTE,
		R_ID_CLIENTE
        FROM FACTURA P
		INNER JOIN CLIENTE_FACTURA CF ON CF.ID_FACTURA=P.ID
		INNER JOIN CLIENTE M ON M.ID=CF.ID_CLIENTE
        WHERE P.ID=P_ID;
		
		OPEN R_LISTA FOR
		SELECT
		FD.ID,
		FD.PRECIO,
		FD.CANTIDAD,
		FD.SUBTOTAL,
		IT.CODIGO,
		IT.NOMBRE
		FROM FACTURA_DETALLE FD
		INNER JOIN ITEM_DETALLE IT ON IT.ID_FACTURA_DETALLE=FD.ID
		WHERE FD.ID_FACTURA=P_ID;

        R_CODIGO := SQLCODE;
        R_MENSAJE := SQLERRM;
    EXCEPTION
        WHEN OTHERS THEN
            R_CODIGO := SQLCODE;
            R_MENSAJE := SQLERRM;
    END SP_S_FACTURA;
	
	PROCEDURE SP_L_FACTURA_PAGINADO (
        P_NRO_COMPROBANTE   IN  VARCHAR2,
		P_FLAG_ACTIVO		IN 	NUMBER,
		P_INDEX				IN 	NUMBER,
		P_SIZE				IN 	NUMBER,
        R_LISTA     		OUT SYS_REFCURSOR,
		R_SIZE				OUT	NUMBER,
        R_CODIGO    		OUT NUMBER,
        R_MENSAJE   		OUT VARCHAR2
    ) AS
        V_SQL 		VARCHAR2(3000);
		V_SQL2 		VARCHAR2(3000);
		V_SQL3 		VARCHAR2(3000);
    BEGIN
        V_SQL := 'SELECT 
		P.ID,
		P.NRO_COMPROBANTE,
		P.MONTO,
		P.FECHA,
		M.NOMBRE||'' ''||M.APELLIDO_PAT||'' ''||M.APELLIDO_MAT AS NOM_CLIENTE,
		M.ID AS ID_CLIENTE,
		P.FLAG_ACTIVO
		FROM FACTURA P
		INNER JOIN CLIENTE_FACTURA CF ON CF.ID_FACTURA=P.ID
		INNER JOIN CLIENTE M ON M.ID=CF.ID_CLIENTE
        WHERE 1=1';

        IF ( P_NRO_COMPROBANTE IS NOT NULL ) THEN
            V_SQL := V_SQL || ' AND P.NRO_COMPROBANTE LIKE ''%' || P_NRO_COMPROBANTE || '%''';
        END IF;
		
		IF ( P_FLAG_ACTIVO IS NOT NULL ) THEN
            V_SQL := V_SQL || ' AND P.FLAG_ACTIVO =' || P_FLAG_ACTIVO;
        END IF;

        V_SQL := V_SQL||' ORDER BY P.FLAG_ACTIVO DESC, P.ID DESC';
		
		V_SQL2 := 'SELECT COUNT(1) FROM ('||V_SQL||')';
		DBMS_OUTPUT.PUT_LINE(V_SQL2);
		EXECUTE IMMEDIATE V_SQL2 INTO R_SIZE;
        
		V_SQL3 := 'SELECT * FROM (SELECT A.*, ROWNUM RNUM FROM ('||V_SQL||') A WHERE ROWNUM <= '||((P_INDEX+1)*P_SIZE)||') WHERE RNUM > '||(P_INDEX*P_SIZE);
		DBMS_OUTPUT.PUT_LINE(V_SQL3);
		OPEN R_LISTA FOR V_SQL3;

        R_CODIGO := SQLCODE;
        R_MENSAJE := SQLERRM;
    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            R_CODIGO := SQLCODE;
            R_MENSAJE := SQLERRM;
    END SP_L_FACTURA_PAGINADO;

END PCK_FACTURA;
/