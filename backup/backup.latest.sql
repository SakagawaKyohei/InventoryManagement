--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.reset_tokens DROP CONSTRAINT reset_tokens_user_id_fkey;
DROP TRIGGER set_partner_id ON public.doitac;
DROP TRIGGER set_dondathang_iddd ON public.dondathang;
DROP TRIGGER set_dondathang_idd ON public.dondathang;
DROP TRIGGER set_dondathang_id ON public.donxuathang;
DROP TRIGGER set_dondathang_id ON public.dondathang;
ALTER TABLE ONLY public.vanchuyen DROP CONSTRAINT vanchuyen_pkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
ALTER TABLE ONLY public.revenue DROP CONSTRAINT revenue_month_key;
ALTER TABLE ONLY public.reset_tokens DROP CONSTRAINT reset_tokens_pkey;
ALTER TABLE ONLY public.product DROP CONSTRAINT product_pkey;
ALTER TABLE ONLY public.invoices DROP CONSTRAINT invoices_pkey;
ALTER TABLE ONLY public.donxuathang DROP CONSTRAINT donxuathang_pkey;
ALTER TABLE ONLY public.dondathang DROP CONSTRAINT dondathang_pkey;
ALTER TABLE ONLY public.doitac DROP CONSTRAINT doitac_pkey;
ALTER TABLE ONLY public.doanhthu DROP CONSTRAINT doanhthu_pkey;
ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
ALTER TABLE public.reset_tokens ALTER COLUMN id DROP DEFAULT;
DROP TABLE public.vanchuyen;
DROP TABLE public.users;
DROP TABLE public.tonkho;
DROP TABLE public.test;
DROP TABLE public.revenue;
DROP SEQUENCE public.reset_tokens_id_seq;
DROP TABLE public.reset_tokens;
DROP TABLE public.product;
DROP SEQUENCE public.product_code_seq;
DROP SEQUENCE public.partner_id_seq;
DROP SEQUENCE public.manv_seq;
DROP TABLE public.logging;
DROP TABLE public.invoices;
DROP SEQUENCE public.donxuathang_id_seq;
DROP TABLE public.donxuathang;
DROP SEQUENCE public.dondathang_id_seqqq;
DROP SEQUENCE public.dondathang_id_seqq;
DROP SEQUENCE public.dondathang_id_seq1;
DROP SEQUENCE public.dondathang_id_seq;
DROP TABLE public.dondathang;
DROP TABLE public.doitac;
DROP TABLE public.doanhthu;
DROP TABLE public.customers;
DROP TABLE public.congno;
DROP FUNCTION public.generate_partner_id();
DROP FUNCTION public.generate_donxuathang_id();
DROP FUNCTION public.generate_dondathang_iddd();
DROP FUNCTION public.generate_dondathang_idd();
DROP FUNCTION public.generate_dondathang_id();
DROP EXTENSION "uuid-ossp";
--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: generate_dondathang_id(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.generate_dondathang_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Tạo id với định dạng 'XH_XXXXXX' (6 chữ số)
    NEW.id := 'XH_' || LPAD(nextval('donxuathang_id_seq')::TEXT, 6, '0');
    RETURN NEW;
END;
$$;


--
-- Name: generate_dondathang_idd(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.generate_dondathang_idd() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.id := 'DH_' || LPAD(nextval('dondathang_id_seqqq')::TEXT, 6, '0');
    RETURN NEW;
END;
$$;


--
-- Name: generate_dondathang_iddd(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.generate_dondathang_iddd() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.id := 'DH_' || LPAD(nextval('dondathang_id_seqqq')::TEXT, 6, '0');
    RETURN NEW;
END;
$$;


--
-- Name: generate_donxuathang_id(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.generate_donxuathang_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Tạo id với định dạng 'XH_XXXXXX' (6 chữ số)
    NEW.id := 'XH_' || LPAD(nextval('donxuathang_id_seq')::TEXT, 6, '0');
    RETURN NEW;
END;
$$;


--
-- Name: generate_partner_id(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.generate_partner_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Tạo id với định dạng 'KH_XXXXXX' (6 chữ số)
    NEW.id := 'KH_' || LPAD(nextval('partner_id_seq')::TEXT, 6, '0');
    RETURN NEW;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: congno; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.congno (
    donhangid character varying,
    doitacname character varying,
    doitacid character varying,
    orderdate timestamp without time zone,
    total numeric,
    status character varying
);


--
-- Name: customers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customers (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    image_url character varying(255) NOT NULL
);


--
-- Name: doanhthu; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.doanhthu (
    month integer NOT NULL,
    year integer NOT NULL,
    revenue numeric
);


--
-- Name: doitac; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.doitac (
    name character varying,
    email character varying,
    sdt character varying,
    dia_chi character varying,
    ao_nuoi jsonb[],
    id character varying NOT NULL
);


--
-- Name: dondathang; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dondathang (
    id character varying NOT NULL,
    company character varying,
    product jsonb[],
    status character varying,
    han_su_dung timestamp without time zone,
    ngay_dat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    manv integer,
    total numeric
);


--
-- Name: dondathang_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.dondathang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dondathang_id_seq1; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.dondathang_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dondathang_id_seqq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.dondathang_id_seqq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dondathang_id_seqqq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.dondathang_id_seqqq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: donxuathang; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.donxuathang (
    id character varying DEFAULT public.uuid_generate_v4() NOT NULL,
    ma_doi_tac character varying,
    product jsonb[],
    status character varying,
    total numeric,
    ngayxuat timestamp without time zone,
    done character varying,
    dain character varying
);


--
-- Name: donxuathang_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.donxuathang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: invoices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.invoices (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    customer_id uuid NOT NULL,
    amount integer NOT NULL,
    status character varying(255) NOT NULL,
    date date NOT NULL
);


--
-- Name: logging; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.logging (
    "time" timestamp without time zone NOT NULL,
    action character varying,
    idforlink character varying,
    user_id numeric
);


--
-- Name: manv_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.manv_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: partner_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.partner_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: product_code_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.product_code_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: product; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product (
    buy_price numeric NOT NULL,
    sell_price numeric NOT NULL,
    company character varying(255) NOT NULL,
    img_product character varying(255) NOT NULL,
    description character varying NOT NULL,
    id character varying(8) DEFAULT ('TA'::text || lpad((nextval('public.product_code_seq'::regclass))::text, 6, '0'::text)) NOT NULL,
    name character varying
);


--
-- Name: reset_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reset_tokens (
    id integer NOT NULL,
    user_id uuid,
    token character varying(64) NOT NULL,
    expiry bigint NOT NULL
);


--
-- Name: reset_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reset_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reset_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reset_tokens_id_seq OWNED BY public.reset_tokens.id;


--
-- Name: revenue; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.revenue (
    month character varying(4) NOT NULL,
    revenue integer NOT NULL
);


--
-- Name: test; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.test (
    donhangid character varying,
    doitacname character varying,
    doitacid character varying,
    orderdate timestamp without time zone,
    total numeric,
    status character varying
);


--
-- Name: tonkho; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tonkho (
    han_su_dung timestamp without time zone,
    ngay_nhap timestamp without time zone,
    so_luong integer,
    ma_don_hang character varying,
    ma_hang character varying
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    status character varying,
    role character varying,
    bank character varying,
    stk character varying,
    ngay_sinh date,
    sdt character varying,
    cccd character varying,
    dia_chi character varying,
    manv integer DEFAULT nextval('public.manv_seq'::regclass)
);


--
-- Name: vanchuyen; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vanchuyen (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    id_don_hang character varying,
    status character varying,
    nhapxuat character varying,
    start_time timestamp without time zone,
    done_time timestamp without time zone,
    kho_xuat_hang character varying(255),
    dia_chi_kho character varying(255),
    id_nguoi_van_chuyen character varying,
    id_doi_tac character varying
);


--
-- Name: reset_tokens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reset_tokens ALTER COLUMN id SET DEFAULT nextval('public.reset_tokens_id_seq'::regclass);


--
-- Data for Name: congno; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.congno (donhangid, doitacname, doitacid, orderdate, total, status) FROM stdin;
XH_000021	Nguyễn Văn 	KH_000018	2024-12-04 20:18:01.303	15000	Chưa thanh toán
XH_000023	Nguyễn Văn 	KH_000018	2024-12-15 09:37:47.96	15000	Đã thanh toán
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.customers (id, name, email, image_url) FROM stdin;
d6e15727-9fe1-4961-8c5b-ea44a9bd81aa	Evil Rabbit	evil@rabbit.com	/customers/evil-rabbit.png
3958dc9e-712f-4377-85e9-fec4b6a6442a	Delba de Oliveira	delba@oliveira.com	/customers/delba-de-oliveira.png
3958dc9e-742f-4377-85e9-fec4b6a6442a	Lee Robinson	lee@robinson.com	/customers/lee-robinson.png
76d65c26-f784-44a2-ac19-586678f7c2f2	Michael Novotny	michael@novotny.com	/customers/michael-novotny.png
cc27c14a-0acf-4f4a-a6c9-d45682c144b9	Amy Burns	amy@burns.com	/customers/amy-burns.png
13d07535-c59e-4157-a011-f8d2ef4e0cbb	Balazs Orban	balazs@orban.com	/customers/balazs-orban.png
\.


--
-- Data for Name: doanhthu; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.doanhthu (month, year, revenue) FROM stdin;
1	2023	42327
2	2023	11881
3	2023	24545
4	2023	24696
5	2023	33077
6	2023	21134
7	2023	48637
8	2023	36029
9	2023	37117
10	2023	23921
11	2023	29846
12	2023	45328
1	2024	24551
2	2024	16340
3	2024	46657
4	2024	15955
5	2024	41596
6	2024	21544
7	2024	23738
8	2024	20487
9	2024	20698
10	2024	45348
11	2024	16183
12	2024	56446
\.


--
-- Data for Name: doitac; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.doitac (name, email, sdt, dia_chi, ao_nuoi, id) FROM stdin;
Trần Thị B	tranthib@example.com	0912345678	Số 20, Cầu Giấy	{"[{\\"stt\\": 1, \\"soluong\\": 4000, \\"thuysan\\": \\"Cá chép\\", \\"dientich\\": 30000, \\"ngaytuoi\\": 20}, {\\"stt\\": 2, \\"soluong\\": 200, \\"thuysan\\": \\"Cá tra\\", \\"dientich\\": 5000, \\"ngaytuoi\\": 30}]"}	KH_000019
Nguyễn Văn 	nguyenvana@gmail.co	098675637	Số 10, Phố Lê Văn Lương, Quận Thanh Xuân, Hà Nội, Việt Nam	{"[{\\"stt\\": 1, \\"soluong\\": 3000, \\"thuysan\\": \\"Tôm\\", \\"dientich\\": 10000, \\"ngaytuoi\\": 30}, {\\"stt\\": 2, \\"soluong\\": 2000, \\"thuysan\\": \\"Cá tra\\", \\"dientich\\": 5000, \\"ngaytuoi\\": 80}]"}	KH_000018
\.


--
-- Data for Name: dondathang; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.dondathang (id, company, product, status, han_su_dung, ngay_dat, manv, total) FROM stdin;
DH_000132	Công ty TNHH thức ăn ABC	{"{\\"id\\": \\"TA000038\\", \\"name\\": \\"T502TĂ cá tra UP số 2/10KG \\", \\"price\\": \\"5000\\", \\"quantity\\": 300}","{\\"id\\": \\"TA000040\\", \\"name\\": \\"T538 TĂ tôm sú UP số 2/20KG\\", \\"price\\": \\"500\\", \\"quantity\\": 50}"}	paid	2025-02-28 00:00:00	2024-12-18 08:13:04.726087	35	1525000
DH_000134	Công ty TNHH XYZ	{"{\\"id\\": \\"TA000039\\", \\"name\\": \\"T510 TĂ cá chẽm UP số 2/50KG\\", \\"price\\": \\"80\\", \\"quantity\\": 200}"}	paid	2025-01-10 00:00:00	2024-12-18 08:13:12.193617	35	16000
DH_000140	Công ty TNHH thức ăn ABC	{"{\\"id\\": \\"TA000038\\", \\"name\\": \\"T502TĂ cá tra UP số 2/10KG \\", \\"price\\": \\"5000\\", \\"quantity\\": 4}","{\\"id\\": \\"TA000040\\", \\"name\\": \\"T538 TĂ tôm sú UP số 2/20KG\\", \\"price\\": \\"500\\", \\"quantity\\": 5}"}	paid	2024-12-21 00:00:00	2024-12-22 08:55:48.978619	35	22500
DH_000138	Công ty TNHH XYZ	{"{\\"id\\": \\"TA000039\\", \\"name\\": \\"T510 TĂ cá chẽm UP số 2/50KG\\", \\"price\\": \\"80\\", \\"quantity\\": 3}"}	paid	2025-01-24 00:00:00	2024-12-22 08:55:43.650064	35	240
\.


--
-- Data for Name: donxuathang; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.donxuathang (id, ma_doi_tac, product, status, total, ngayxuat, done, dain) FROM stdin;
XH_000005	KH_000018	{"[{\\"id\\": \\"TA000039\\", \\"name\\": \\"k\\", \\"dongia\\": \\"80.000 ₫\\", \\"soluong\\": 20, \\"thanhtien\\": \\"1.600.000 ₫\\"}]"}	đang vận chuyển	1600	\N	\N	\N
XH_000006	KH_000019	{"[{\\"id\\": \\"TA000039\\", \\"name\\": \\"k\\", \\"dongia\\": \\"80.000 ₫\\", \\"soluong\\": 20, \\"thanhtien\\": \\"1.600.000 ₫\\"}]"}	đang vận chuyển	1600	\N	\N	\N
XH_000007	KH_000018	{"[{\\"id\\": \\"TA000039\\", \\"name\\": \\"k\\", \\"dongia\\": \\"80.000 ₫\\", \\"soluong\\": 3, \\"thanhtien\\": \\"240.000 ₫\\"}]"}	đang vận chuyển	240	2024-11-30 14:48:39.151306	\N	\N
XH_000008	KH_000018	{"[{\\"id\\": \\"TA000039\\", \\"name\\": \\"k\\", \\"dongia\\": \\"80.000 ₫\\", \\"soluong\\": 3, \\"thanhtien\\": \\"240.000 ₫\\"}]"}	đang vận chuyển	240	2024-11-30 14:51:52.935856	\N	\N
XH_000010	KH_000018	{"[{\\"id\\": \\"TA000039\\", \\"name\\": \\"k\\", \\"dongia\\": \\"80.000 ₫\\", \\"soluong\\": 3, \\"thanhtien\\": \\"240.000 ₫\\"}]"}	đang vận chuyển	240	2024-12-01 06:49:46.901899	\N	\N
XH_000013	KH_000018	{"[{\\"id\\": \\"TA000038\\", \\"name\\": \\"T502TĂ cá tra UP số 2/10KG \\", \\"dongia\\": \\"5.000.000 ₫\\", \\"soluong\\": 4, \\"thanhtien\\": \\"20.000.000 ₫\\"}]"}	Đã vận chuyển	20000	2024-12-01 13:42:14.035744	\N	\N
XH_000014	KH_000018	{"[{\\"id\\": \\"TA000039\\", \\"name\\": \\"k\\", \\"dongia\\": \\"80.000 ₫\\", \\"soluong\\": 2, \\"thanhtien\\": \\"160.000 ₫\\"}]"}	Đã vận chuyển	160	2024-12-01 13:43:12.063504	\N	\N
XH_000022	KH_000018	{"[{\\"id\\": \\"TA000039\\", \\"name\\": \\"k\\", \\"dongia\\": \\"80.000 ₫\\", \\"soluong\\": 3, \\"thanhtien\\": \\"240.000 ₫\\"}, {\\"id\\": \\"TA000038\\", \\"name\\": \\"T502TĂ cá tra UP số 2/10KG \\", \\"dongia\\": \\"5.000.000 ₫\\", \\"soluong\\": 4, \\"thanhtien\\": \\"20.000.000 ₫\\"}]"}	đang vận chuyển	20240	2024-12-05 03:55:48.501284	\N	\N
XH_000024	KH_000018	{"[{\\"id\\": \\"TA000039\\", \\"name\\": \\"k\\", \\"dongia\\": \\"80.000 ₫\\", \\"soluong\\": 3, \\"thanhtien\\": \\"240.000 ₫\\"}]"}	đang vận chuyển	240	2024-12-15 16:41:38.301877	\N	\N
XH_000021	KH_000018	{"[{\\"id\\": \\"TA000038\\", \\"name\\": \\"T502TĂ cá tra UP số 2/10KG \\", \\"dongia\\": \\"5.000.000 ₫\\", \\"soluong\\": 3, \\"thanhtien\\": \\"15.000.000 ₫\\"}]"}	Đã vận chuyển	15000	2024-12-05 03:18:01.303175	\N	\N
XH_000023	KH_000018	{"[{\\"id\\": \\"TA000038\\", \\"name\\": \\"T502TĂ cá tra UP số 2/10KG \\", \\"dongia\\": \\"5.000.000 ₫\\", \\"soluong\\": 3, \\"thanhtien\\": \\"15.000.000 ₫\\"}]"}	Đã vận chuyển	15000	2024-12-15 16:37:47.960316	\N	\N
XH_000009	KH_000018	{"[{\\"id\\": \\"TA000038\\", \\"name\\": \\"T502TĂ cá tra UP số 2/10KG \\", \\"dongia\\": \\"5.000.000 ₫\\", \\"soluong\\": 20, \\"thanhtien\\": \\"100.000.000 ₫\\"}]"}	Đã vận chuyển	100000	2024-12-01 06:32:45.601319	\N	d
XH_000011	KH_000018	{"[{\\"id\\": \\"TA000038\\", \\"name\\": \\"T502TĂ cá tra UP số 2/10KG \\", \\"dongia\\": \\"5.000.000 ₫\\", \\"soluong\\": 3, \\"thanhtien\\": \\"15.000.000 ₫\\"}, {\\"id\\": \\"TA000039\\", \\"name\\": \\"k\\", \\"dongia\\": \\"80.000 ₫\\", \\"soluong\\": 3, \\"thanhtien\\": \\"240.000 ₫\\"}]"}	Đã vận chuyển	15240	2024-12-01 10:37:07.775708	\N	d
XH_000012	KH_000019	{"[{\\"id\\": \\"TA000038\\", \\"name\\": \\"T502TĂ cá tra UP số 2/10KG \\", \\"dongia\\": \\"5.000.000 ₫\\", \\"soluong\\": 3, \\"thanhtien\\": \\"15.000.000 ₫\\"}]"}	Đã vận chuyển	15000	2024-12-01 10:44:40.586052	\N	d
\.


--
-- Data for Name: invoices; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.invoices (id, customer_id, amount, status, date) FROM stdin;
02de8a87-80ce-4a95-afa9-62ea2e8b34d0	d6e15727-9fe1-4961-8c5b-ea44a9bd81aa	15795	pending	2022-12-06
3984185b-00b4-4b97-b8f2-02f7974e527d	3958dc9e-712f-4377-85e9-fec4b6a6442a	20348	pending	2022-11-14
cfb67a87-4858-4113-a310-cf0b40bf494c	cc27c14a-0acf-4f4a-a6c9-d45682c144b9	3040	paid	2022-10-29
05dad208-b7ac-40c2-8aa8-c49e7703a309	13d07535-c59e-4157-a011-f8d2ef4e0cbb	34577	pending	2023-08-05
a65eda72-f3fd-4c0c-aff9-d677054bc1c0	3958dc9e-742f-4377-85e9-fec4b6a6442a	54246	pending	2023-07-16
838a0138-9647-40ad-983c-9396a8fc7e08	d6e15727-9fe1-4961-8c5b-ea44a9bd81aa	666	pending	2023-06-27
85548d53-5b4b-4500-991c-009ca66c91cc	76d65c26-f784-44a2-ac19-586678f7c2f2	32545	paid	2023-06-09
cb024a45-8a65-43fb-9e52-f29a2c449030	cc27c14a-0acf-4f4a-a6c9-d45682c144b9	1250	paid	2023-06-17
cf2ea2d0-5f37-43db-8c1c-181ecaf1eef4	13d07535-c59e-4157-a011-f8d2ef4e0cbb	8546	paid	2023-06-07
1f6fb967-e2ad-4183-8311-348a39b322ee	13d07535-c59e-4157-a011-f8d2ef4e0cbb	8945	paid	2023-06-03
2cbee22c-c602-43c1-9ace-322184f438e7	3958dc9e-742f-4377-85e9-fec4b6a6442a	1000	paid	2022-06-05
\.


--
-- Data for Name: logging; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.logging ("time", action, idforlink, user_id) FROM stdin;
2024-12-16 16:04:04.739145	Thanh toán	DH_000130	35
2024-12-17 05:58:38.308635	Xóa đối tác	KH_000024	35
2024-12-17 05:58:39.244005	Xóa đối tác	KH_000025	35
2024-12-17 07:27:28.486786	Xóa sản phẩm	TA000047	35
2024-12-18 07:12:21.811233	Tạo sản phẩm	TA000048	35
2024-12-18 07:12:41.087402	Tạo sản phẩm	TA000049	35
2024-12-18 07:16:00.872851	Chỉnh sửa sản phẩm	TA000038	35
2024-12-18 07:18:34.334624	Chỉnh sửa sản phẩm	TA000039	35
2024-12-18 07:19:38.848369	Chỉnh sửa sản phẩm	TA000040	35
2024-12-18 07:21:14.032603	Chỉnh sửa sản phẩm	TA000038	35
2024-12-18 07:21:39.029619	Chỉnh sửa sản phẩm	TA000039	35
2024-12-18 07:22:20.435568	Chỉnh sửa sản phẩm	TA000039	35
2024-12-18 07:25:46.397279	Chỉnh sửa sản phẩm	TA000040	35
2024-12-18 07:53:18.946324	Chỉnh sửa sản phẩm	TA000040	35
2024-12-18 07:53:36.113919	Chỉnh sửa sản phẩm	TA000039	35
2024-12-18 07:54:10.147853	Chỉnh sửa sản phẩm	TA000048	35
2024-12-18 07:54:27.834727	Chỉnh sửa sản phẩm	TA000039	35
2024-12-18 07:54:44.500677	Chỉnh sửa sản phẩm	TA000040	35
2024-12-18 07:56:44.232049	Chỉnh sửa sản phẩm	TA000049	35
2024-12-18 07:57:59.701275	Chỉnh sửa sản phẩm	TA000049	35
2024-12-18 07:58:16.005215	Chỉnh sửa sản phẩm	TA000049	35
2024-12-18 07:59:40.629075	Chỉnh sửa sản phẩm	TA000039	35
2024-12-18 08:00:02.515296	Chỉnh sửa sản phẩm	TA000048	35
2024-12-18 08:00:20.454616	Chỉnh sửa sản phẩm	TA000049	35
2024-12-18 08:00:37.22568	Chỉnh sửa sản phẩm	TA000048	35
2024-12-18 08:13:21.435392	Tạo đơn đặt hàng	DH_000134	35
2024-12-18 08:13:21.484007	Tạo đơn đặt hàng	DH_000132	35
2024-12-18 08:14:46.331446	Thanh toán	DH_000132	35
2024-12-18 08:15:36.513673	Thanh toán	DH_000134	35
2024-12-18 08:16:15.714926	Đã vận chuyển	DH_000132	35
2024-12-18 08:16:31.548769	Đã vận chuyển	DH_000134	35
2024-12-22 08:55:56.47331	Tạo đơn đặt hàng	DH_000138	35
2024-12-22 08:55:56.520664	Tạo đơn đặt hàng	DH_000140	35
2024-12-22 09:07:46.38063	Thanh toán	DH_000140	35
2024-12-22 09:22:12.575926	Thanh toán	DH_000138	35
2024-12-27 04:01:00.434131	Chỉnh sửa sản phẩm	\N	\N
2024-12-27 04:01:11.499404	Chỉnh sửa sản phẩm	\N	\N
2024-12-27 09:12:12.955434	Chỉnh sửa người dùng	35	35
2024-12-27 09:12:22.461491	Chỉnh sửa người dùng	35	35
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.product (buy_price, sell_price, company, img_product, description, id, name) FROM stdin;
5000	600	Công ty TNHH thức ăn ABC	https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/public/485657ce-ebae-4650-b464-7c8a83f1cda3.jpg	kkk	TA000038	T502TĂ cá tra UP số 2/10KG 
500	600	Công ty TNHH thức ăn ABC	https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/public/66306a34-5c5a-4012-8fd0-fcf54fc01384.jpg		TA000040	T538 TĂ tôm sú UP số 2/20KG
80	100	Công ty TNHH XYZ	https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/public/de7410ca-8787-47a3-9704-2a074738f80b.jpg		TA000039	T510 TĂ cá chẽm UP số 2/50KG
200	300	Công ty TNHH XY	https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/public/cecd1443-1b14-488e-8713-300df4d19463.jpg	2	TA000049	THỨC ĂN CÁ RÔ PHI S030.F02 25kg
400	600	Công ty TNHH XY	https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/public/e44bd49e-310d-4abd-9531-b2ca4fc5651d.jpg	1	TA000048	T504TĂ cá lóc UP số 2/10KG
\.


--
-- Data for Name: reset_tokens; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.reset_tokens (id, user_id, token, expiry) FROM stdin;
1	5c4a8b76-45a6-41a9-beac-25a09713b12d	6d143d0066334b5d95a4021adf2b681a2d61838d8c893f96dfebe02e85fb8b73	1730283600214
2	5c4a8b76-45a6-41a9-beac-25a09713b12d	b514b2535325ab48c7a8cd17421816304d82a665159f02691ea27051af595d84	1730300460379
3	5c4a8b76-45a6-41a9-beac-25a09713b12d	ad051c9e0f3b26338ab9b12c6c89f0116ff3eedd0c6456d69ce5db03b520228a	1730300461489
4	5c4a8b76-45a6-41a9-beac-25a09713b12d	fe5031e6a31b7ef295f486af3556883483ba5658b3868b6fb323737d0a97655c	1730520133853
5	5c4a8b76-45a6-41a9-beac-25a09713b12d	94a8d8ecacd110c99348a572adb1696c3d9a6b82f00e5ead845d78e3cca5c770	1730532563091
6	5c4a8b76-45a6-41a9-beac-25a09713b12d	5f3642f784e605c592dc03e0e8b9189a9fba15419528ee9b950eec2ea8e01877	1730533096343
7	5c4a8b76-45a6-41a9-beac-25a09713b12d	63fdfca49701446622ff80da93c11c94447e27a34d858cd36192fcd6475fe26b	1730535450876
8	5c4a8b76-45a6-41a9-beac-25a09713b12d	4c2c6b43dcbd946ebf83fc6ecd1cd8a74c3c13722d226fe4658be95487ddfdf8	1730535478414
9	5c4a8b76-45a6-41a9-beac-25a09713b12d	838a7f2575918fb88bed075e099aef8c2ad4d0ab1f85f6bd5cc6870e49e28fa3	1730556021592
10	5c4a8b76-45a6-41a9-beac-25a09713b12d	17d68c27d2ee199463fbe1fab77f398b9e3217c89ea08f01c26b25a6f06a10b7	1730556060062
11	5c4a8b76-45a6-41a9-beac-25a09713b12d	130ee1ee0b77b0bb8fa0cba6224741e27b1d8450e6c971be2251b7aab6bce376	1730556102265
12	5c4a8b76-45a6-41a9-beac-25a09713b12d	a267c675b00c063e868aee1cadfbefbb3539feb34375d0f38ce09ff1444831ce	1730556135467
13	5c4a8b76-45a6-41a9-beac-25a09713b12d	e118ffe2826c4eb3203a0bb4ee581389ee644438d6b9a7e9a1510805687384c4	1730556189117
14	5c4a8b76-45a6-41a9-beac-25a09713b12d	aa2c865b4ef0177f89fd3b0b4f50de949fecabe9bf4b90490b220c6c74d6ebd3	1730556212508
15	5c4a8b76-45a6-41a9-beac-25a09713b12d	8a2a490025634d18ca42febd37f970197caeb4c4909b82a7aa12c077aeee3246	1730556298055
16	5c4a8b76-45a6-41a9-beac-25a09713b12d	fa9c67e72039b1ad84b64bc57a0aacf7abcdb5dc31b6439120c575acfdc19864	1730556350217
21	5c4a8b76-45a6-41a9-beac-25a09713b12d	01e3ed3351ab55df6246a5dbf9bff2c080f0c5efb928bbb1abaac33f7aaf8b54	1730564084910
22	5c4a8b76-45a6-41a9-beac-25a09713b12d	0d15c1c273ed810406a0bd207c31bcf5b61f4b52183e14ce80c45f65e008fb76	1730652120423
23	5c4a8b76-45a6-41a9-beac-25a09713b12d	46998a09c5bc12104970e73db9630e78ab0030d2bbfc2d23a349ba656243f2ef	1730652121596
24	5c4a8b76-45a6-41a9-beac-25a09713b12d	e4647877feb267f10822ecfcd4dac876ed4dc2a183b159e94a41a01fb4f157a5	1730654049208
25	5c4a8b76-45a6-41a9-beac-25a09713b12d	5c63155b274cd63c3c3995820ae521f5ef047ef4a12534076568367d660ff214	1730654050185
26	5c4a8b76-45a6-41a9-beac-25a09713b12d	79465f8f966e3ae44f72e3669feeefc3fbaa30f078d299a611840dfe67a04bce	1730654293503
27	5c4a8b76-45a6-41a9-beac-25a09713b12d	e8416991c8059266a8bd64f74d80d1a5888c367235a9de70d3b8b183d7958e5e	1730654294376
28	5c4a8b76-45a6-41a9-beac-25a09713b12d	30f4fdec5721e92599fbe87abda831a793618de4d756872f3e978b77267304ef	1730655486082
29	5c4a8b76-45a6-41a9-beac-25a09713b12d	94f69efcf23d93de8cba51bc335e583dab8ce761530b737987b8caba2791891b	1730713884569
30	5c4a8b76-45a6-41a9-beac-25a09713b12d	10de04341c1662214c5a7faca0e3534fc84d6bcbb0217b5321d436fa6d3f5577	1730714618958
31	5c4a8b76-45a6-41a9-beac-25a09713b12d	447f0372ffae855516b1db403f10582dd68223b494141a740d2d86d3db34f54b	1730714619494
32	5c4a8b76-45a6-41a9-beac-25a09713b12d	bf935dc0dbb29f70afdef555b1037eebc77ab58b04eb2b3d91baa3a34b31cb5d	1730715050023
33	5c4a8b76-45a6-41a9-beac-25a09713b12d	ea6ea6ade2dbe8cd7a128ab5a7fe20a038d32020e956371b7921f9163a320cbf	1730715050578
34	5c4a8b76-45a6-41a9-beac-25a09713b12d	bc20c8e468e2cbcc5ae517da8a6e38b7cb541b5e1b5c82bf470c41a5eda10504	1734863819709
\.


--
-- Data for Name: revenue; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.revenue (month, revenue) FROM stdin;
Jan	2000
Feb	1800
Mar	2200
Apr	2500
May	2300
Jun	3200
Jul	3500
Aug	3700
Sep	2500
Oct	2800
Nov	3000
Dec	4800
\.


--
-- Data for Name: test; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.test (donhangid, doitacname, doitacid, orderdate, total, status) FROM stdin;
\.


--
-- Data for Name: tonkho; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tonkho (han_su_dung, ngay_nhap, so_luong, ma_don_hang, ma_hang) FROM stdin;
2024-12-13 00:00:00	2024-11-30 05:25:06.011408	60	DH_000114	TA000038
2025-02-28 00:00:00	2024-12-18 08:16:15.674988	300	DH_000132	TA000038
2025-02-28 00:00:00	2024-12-18 08:16:15.674988	50	DH_000132	TA000040
2025-01-10 00:00:00	2024-12-18 08:16:31.500172	200	DH_000134	TA000039
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, email, password, status, role, bank, stk, ngay_sinh, sdt, cccd, dia_chi, manv) FROM stdin;
0af81105-6041-4038-a8a8-42ab34956f29	Lâm Gia Bảo	folayib669@bflcafe.com	$2a$10$FlMcg3gzvu3K6NqyDOUzK.ZeRTu98aS63jJXb.5ea3HFoYH9zgwga	unactive		3	3	2024-12-14	0932870398	093203007764	Đường Tạ Quang Bửu, Khu phố 6, phường Linh Trung, thành phố Thủ Đức, Thành phố Hồ Chí Minh	52
28f8a1a7-0d11-43ba-bf6c-44d3ad711451	Lê Hoàng B	sakagawakyohei@gmail.com	$2a$10$/eKOxuOEvR/jeOu9Z8AW0OCjUZ1713nuaR5.CVea4/eV7QTIw8AMm	active	người vận chuyển	3	3	2024-12-14	0932870398	093203007764	Đường Tạ Quang Bửu, Khu phố 6, phường Linh Trung, thành phố Thủ Đức, Thành phố Hồ Chí Minh	50
e1a84556-0b25-4404-a580-7e47816e3195	Nguyễn Văn A	senkiwasona@gmail.com	$2a$10$4.seAZWEbWTMyCmV9gxdN.won/s5ifWafpKsYucGzXwXmS0q4Vg3O	active	kế toán	3	3	2024-12-14	0932870398	093203007764	Đường Tạ Quang Bửu, Khu phố 6, phường Linh Trung, thành phố Thủ Đức, Thành phố Hồ Chí Minh	51
7a16e642-0316-48d0-bb00-24cbbaca2e59	21520607@gm.uit.edu.vn	21520607@gm.uit.edu.vn	$2a$10$IrBfg/8uMtGrCFJH3fD5m.O1B89/YeM88ox6VQXsdsz7zU1YnTTem	unactive	kế toán	21520607@gm.uit.edu.vn	8	2024-12-03	21520607@gm.uit.edu.vn	21520607@gm.uit.edu.vn	21520607@gm.uit.edu.vn	60
5c4a8b76-45a6-41a9-beac-25a09713b12d	Lâm Gia Bảo	lamgiabao1039@gmail.com	$2b$10$kBAhvxhb1bcXJoGYUqThp.NfYYzRPanJSTeeIO7ej6dDBCPqQfeY2	active	admin	3	3	2024-12-11	093287039	093203007764	Đường Tạ Quang Bửu, Khu phố 6, phường Linh Trung, thành phố Thủ Đức, Thành phố Hồ Chí Minh	35
\.


--
-- Data for Name: vanchuyen; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vanchuyen (id, id_don_hang, status, nhapxuat, start_time, done_time, kho_xuat_hang, dia_chi_kho, id_nguoi_van_chuyen, id_doi_tac) FROM stdin;
f24505de-e7e7-4b61-a403-f1352ef0c16d	XH_000010	Đã vận chuyển	Xuất	2024-12-01 06:49:46.93933	2024-12-01 06:56:46.681589	Nguyễn Văn 	Số 10, Phố Lê Văn Lương, Quận Thanh Xuân, Hà Nội, Việt Na	28f8a1a7-0d11-43ba-bf6c-44d3ad711451	KH_000018
5aab7740-45ce-485f-84c0-d439f57883f1	XH_000009	Đã vận chuyển	Xuất	2024-12-01 06:32:45.670483	2024-12-01 06:58:22.52547	Nguyễn Văn 	Số 10, Phố Lê Văn Lương, Quận Thanh Xuân, Hà Nội, Việt Na	28f8a1a7-0d11-43ba-bf6c-44d3ad711451	KH_000018
e6e1fa8d-b62d-4181-aa8d-82f7b0da2a52	XH_000011	Đã vận chuyển	Xuất	2024-12-01 10:37:07.829041	2024-12-01 10:37:25.770845	Nguyễn Văn 	Số 10, Phố Lê Văn Lương, Quận Thanh Xuân, Hà Nội, Việt Na	28f8a1a7-0d11-43ba-bf6c-44d3ad711451	KH_000018
cf4796fd-486d-4d03-b091-71ed1dcbe135	XH_000012	Đã vận chuyển	Xuất	2024-12-01 10:44:40.633586	2024-12-01 10:44:54.810378	Trần Thị B	Số 20, Cầu Giấy	28f8a1a7-0d11-43ba-bf6c-44d3ad711451	KH_000019
0679dc13-7380-471d-9714-6742642e5153	XH_000013	Đã vận chuyển	Xuất	2024-12-01 13:42:14.092526	2024-12-01 13:42:44.572414	Nguyễn Văn 	Số 10, Phố Lê Văn Lương, Quận Thanh Xuân, Hà Nội, Việt Na	28f8a1a7-0d11-43ba-bf6c-44d3ad711451	KH_000018
fff269a4-c49b-4291-ba2f-13c6c25c99ba	XH_000014	Đã vận chuyển	Xuất	2024-12-01 13:43:12.101123	2024-12-01 13:43:24.463326	Nguyễn Văn 	Số 10, Phố Lê Văn Lương, Quận Thanh Xuân, Hà Nội, Việt Na	28f8a1a7-0d11-43ba-bf6c-44d3ad711451	KH_000018
177d432f-5a21-496e-b652-7f5f0c93bedb	XH_000022	đang vận chuyển	Xuất	2024-12-05 03:55:48.57306	\N	Nguyễn Văn 	Số 10, Phố Lê Văn Lương, Quận Thanh Xuân, Hà Nội, Việt Nam	28f8a1a7-0d11-43ba-bf6c-44d3ad711451	KH_000018
fb3821e6-ef63-47bd-928c-7bf45d1884c6	XH_000005	Đã vận chuyển	Xuất	2024-11-30 08:45:54.989277	2024-11-30 14:40:15.151725	Nguyễn Văn 	Số 10, Phố Lê Văn Lương, Quận Thanh Xuân, Hà Nội, Việt Na	28f8a1a7-0d11-43ba-bf6c-44d3ad711451	KH_000018
c23232a6-6881-4cc9-9602-b158077631cf	XH_000006	Đã vận chuyển	Xuất	2024-11-30 14:46:37.492117	2024-11-30 14:47:04.535264	Trần Thị B	Số 20, Cầu Giấy	28f8a1a7-0d11-43ba-bf6c-44d3ad711451	KH_000019
6a98fdf5-e9ac-4442-9bda-21c0fd57da6e	XH_000007	Đã vận chuyển	Xuất	2024-11-30 14:48:39.185851	2024-11-30 14:49:10.090485	Nguyễn Văn 	Số 10, Phố Lê Văn Lương, Quận Thanh Xuân, Hà Nội, Việt Na	28f8a1a7-0d11-43ba-bf6c-44d3ad711451	KH_000018
894499f5-f563-47ee-929d-b49208d68be8	XH_000008	Đã vận chuyển	Xuất	2024-11-30 14:51:52.973569	2024-11-30 14:52:02.040402	Nguyễn Văn 	Số 10, Phố Lê Văn Lương, Quận Thanh Xuân, Hà Nội, Việt Na	28f8a1a7-0d11-43ba-bf6c-44d3ad711451	KH_000018
3516bdcb-9502-46c7-affa-9a5892fbea24	XH_000024	đang vận chuyển	Xuất	2024-12-15 16:41:38.349438	\N	Nguyễn Văn 	Số 10, Phố Lê Văn Lương, Quận Thanh Xuân, Hà Nội, Việt Nam	28f8a1a7-0d11-43ba-bf6c-44d3ad711451	KH_000018
3a2b1bd1-898c-40bc-adc6-bd45fc3eb20d	XH_000021	Đã vận chuyển	Xuất	2024-12-05 03:18:01.372303	2024-12-16 16:03:27.866796	Nguyễn Văn 	Số 10, Phố Lê Văn Lương, Quận Thanh Xuân, Hà Nội, Việt Nam	28f8a1a7-0d11-43ba-bf6c-44d3ad711451	KH_000018
8079e9e3-7833-4767-a24c-7d0c6a82f416	XH_000023	Đã vận chuyển	Xuất	2024-12-15 16:37:48.01023	2024-12-16 16:03:36.97841	Nguyễn Văn 	Số 10, Phố Lê Văn Lương, Quận Thanh Xuân, Hà Nội, Việt Nam	28f8a1a7-0d11-43ba-bf6c-44d3ad711451	KH_000018
55d8c8f1-10f9-49e2-8ebe-a0992f2521b9	DH_000138	đang vận chuyển	Nhập	2024-12-22 09:22:12.629572	\N	Kho thành phẩm XYZ	Đường 10, xã X, phường ANB	28f8a1a7-0d11-43ba-bf6c-44d3ad711451	\N
\.


--
-- Name: dondathang_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.dondathang_id_seq', 59, true);


--
-- Name: dondathang_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.dondathang_id_seq1', 1, false);


--
-- Name: dondathang_id_seqq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.dondathang_id_seqq', 1, false);


--
-- Name: dondathang_id_seqqq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.dondathang_id_seqqq', 140, true);


--
-- Name: donxuathang_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.donxuathang_id_seq', 27, true);


--
-- Name: manv_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.manv_seq', 60, true);


--
-- Name: partner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.partner_id_seq', 25, true);


--
-- Name: product_code_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_code_seq', 49, true);


--
-- Name: reset_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reset_tokens_id_seq', 34, true);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: doanhthu doanhthu_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doanhthu
    ADD CONSTRAINT doanhthu_pkey PRIMARY KEY (month, year);


--
-- Name: doitac doitac_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doitac
    ADD CONSTRAINT doitac_pkey PRIMARY KEY (id);


--
-- Name: dondathang dondathang_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dondathang
    ADD CONSTRAINT dondathang_pkey PRIMARY KEY (id);


--
-- Name: donxuathang donxuathang_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.donxuathang
    ADD CONSTRAINT donxuathang_pkey PRIMARY KEY (id);


--
-- Name: invoices invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: reset_tokens reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reset_tokens
    ADD CONSTRAINT reset_tokens_pkey PRIMARY KEY (id);


--
-- Name: revenue revenue_month_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue
    ADD CONSTRAINT revenue_month_key UNIQUE (month);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: vanchuyen vanchuyen_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vanchuyen
    ADD CONSTRAINT vanchuyen_pkey PRIMARY KEY (id);


--
-- Name: dondathang set_dondathang_id; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_dondathang_id BEFORE INSERT ON public.dondathang FOR EACH ROW EXECUTE FUNCTION public.generate_dondathang_id();


--
-- Name: donxuathang set_dondathang_id; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_dondathang_id BEFORE INSERT ON public.donxuathang FOR EACH ROW EXECUTE FUNCTION public.generate_donxuathang_id();


--
-- Name: dondathang set_dondathang_idd; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_dondathang_idd BEFORE INSERT ON public.dondathang FOR EACH ROW EXECUTE FUNCTION public.generate_dondathang_idd();


--
-- Name: dondathang set_dondathang_iddd; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_dondathang_iddd BEFORE INSERT ON public.dondathang FOR EACH ROW EXECUTE FUNCTION public.generate_dondathang_iddd();


--
-- Name: doitac set_partner_id; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_partner_id BEFORE INSERT ON public.doitac FOR EACH ROW EXECUTE FUNCTION public.generate_partner_id();


--
-- Name: reset_tokens reset_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reset_tokens
    ADD CONSTRAINT reset_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

