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
    id character varying NOT NULL,
    lichsu jsonb[]
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
XH_000036	Nguyễn Văn 	KH_000018	2024-12-27 07:12:10.079	516000	Chưa thanh toán
XH_000038	Nguyễn Văn 	KH_000018	2024-12-27 07:15:53.641	25800	Đã thanh toán
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
12	2024	184646
1	2025	15000
\.


--
-- Data for Name: doitac; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.doitac (name, email, sdt, dia_chi, ao_nuoi, id, lichsu) FROM stdin;
Trần Thị B	tranthib@example.com	0912345678	Số 20, Cầu Giấy	{"[{\\"stt\\": 1, \\"soluong\\": 4000, \\"thuysan\\": \\"Cá chép\\", \\"dientich\\": 30000, \\"ngaytuoi\\": 20}, {\\"stt\\": 2, \\"soluong\\": 200, \\"thuysan\\": \\"Cá tra\\", \\"dientich\\": 5000, \\"ngaytuoi\\": 30}]"}	KH_000019	\N
Nguyễn Văn 	nguyenvana@gmail.co	098675637	Số 10, Phố Lê Văn Lương, Quận Thanh Xuân, Hà Nội, Việt Nam	{"[{\\"stt\\": 1, \\"soluong\\": 3000, \\"thuysan\\": \\"Tôm\\", \\"dientich\\": 10000, \\"ngaytuoi\\": 30}, {\\"stt\\": 2, \\"soluong\\": 2000, \\"thuysan\\": \\"Cá tra\\", \\"dientich\\": 5000, \\"ngaytuoi\\": 80}]"}	KH_000018	\N
Nguyên 	nguyen@gmail.com	097866392	10, Thủ Đức, HCM	{"[{\\"stt\\": 1, \\"soluong\\": 10, \\"thuysan\\": \\"Cá tra\\", \\"dientich\\": 100, \\"ngaytuoi\\": 20}]"}	KH_000026	\N
\.


--
-- Data for Name: dondathang; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.dondathang (id, company, product, status, han_su_dung, ngay_dat, manv, total) FROM stdin;
DH_000154	Công ty TNHH XY	{"{\\"id\\": \\"TA000048\\", \\"name\\": \\"T504TĂ cá lóc UP số 2/10KG\\", \\"price\\": \\"400\\", \\"quantity\\": 200}","{\\"id\\": \\"TA000049\\", \\"name\\": \\"THỨC ĂN CÁ RÔ PHI S030.F02 25kg\\", \\"price\\": \\"200\\", \\"quantity\\": 100}"}	paid	2024-09-19 00:00:00	2024-12-27 14:17:02.141729	35	100000
DH_000148	Công ty TNHH thức ăn ABC	{"{\\"id\\": \\"TA000038\\", \\"name\\": \\"T502TĂ cá tra UP số 2/10KG \\", \\"price\\": \\"5000\\", \\"quantity\\": 300}","{\\"id\\": \\"TA000040\\", \\"name\\": \\"T538 TĂ tôm sú UP số 2/20KG\\", \\"price\\": \\"500\\", \\"quantity\\": 200}"}	paid	2025-03-21 00:00:00	2024-12-27 14:08:18.822736	60	1600000
DH_000150	Công ty TNHH XYZ	{"{\\"id\\": \\"TA000039\\", \\"name\\": \\"T510 TĂ cá chẽm UP số 2/50KG\\", \\"price\\": \\"80\\", \\"quantity\\": 500}"}	paid	2025-02-04 00:00:00	2024-12-27 14:08:24.98455	60	40000
DH_000152	Công ty TNHH XY	{"{\\"id\\": \\"TA000049\\", \\"name\\": \\"THỨC ĂN CÁ RÔ PHI S030.F02 25kg\\", \\"price\\": \\"200\\", \\"quantity\\": 1000}"}	paid	2024-12-05 00:00:00	2024-12-27 14:08:30.739317	60	200000
DH_000166	Công ty TNHH thức ăn ABC	{"{\\"id\\": \\"TA000038\\", \\"name\\": \\"T502TĂ cá tra UP số 2/10KG \\", \\"price\\": \\"5000\\", \\"quantity\\": 10}"}	pending	\N	2024-12-28 04:54:24.96693	35	50000
DH_000164	Công ty TNHH XY	{"{\\"id\\": \\"TA000048\\", \\"name\\": \\"T504TĂ cá lóc UP số 2/10KG\\", \\"price\\": \\"400\\", \\"quantity\\": 300}"}	paid	2024-12-04 00:00:00	2024-12-28 04:53:52.539056	35	120000
DH_000158	Công ty TNHH XYZ	{"{\\"id\\": \\"TA000039\\", \\"name\\": \\"T510 TĂ cá chẽm UP số 2/50KG\\", \\"price\\": \\"80\\", \\"quantity\\": 50}"}	pending	\N	2024-12-27 14:17:30.744618	35	4000
DH_000168	Công ty TNHH thức ăn ABC	{"{\\"id\\": \\"TA000038\\", \\"name\\": \\"T502TĂ cá tra UP số 2/10KG \\", \\"price\\": \\"5000\\", \\"quantity\\": 10}"}	pending	\N	2025-01-16 13:59:02.653271	51	50000
DH_000170	Công ty TNHH XYZ	{"{\\"id\\": \\"TA000039\\", \\"name\\": \\"T510 TĂ cá chẽm UP số 2/50KG\\", \\"price\\": \\"80\\", \\"quantity\\": 30}"}	pending	\N	2025-01-16 13:59:10.897369	51	2400
DH_000160	Công ty TNHH XY	{"{\\"id\\": \\"TA000048\\", \\"name\\": \\"T504TĂ cá lóc UP số 2/10KG\\", \\"price\\": \\"400\\", \\"quantity\\": 200}","{\\"id\\": \\"TA000049\\", \\"name\\": \\"THỨC ĂN CÁ RÔ PHI S030.F02 25kg\\", \\"price\\": \\"200\\", \\"quantity\\": 100}"}	pending	\N	2024-12-27 14:33:43.532982	35	100000
DH_000156	Công ty TNHH thức ăn ABC	{"{\\"id\\": \\"TA000038\\", \\"name\\": \\"T502TĂ cá tra UP số 2/10KG \\", \\"price\\": \\"5000\\", \\"quantity\\": 30}"}	paid	2025-02-07 00:00:00	2024-12-27 14:17:24.573285	35	150000
DH_000172	Công ty TNHH XY	{"{\\"id\\": \\"TA000048\\", \\"name\\": \\"T504TĂ cá lóc UP số 2/10KG\\", \\"price\\": \\"400\\", \\"quantity\\": 3}"}	paid	2025-02-13 00:00:00	2025-01-19 13:18:59.871799	35	1200
\.


--
-- Data for Name: donxuathang; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.donxuathang (id, ma_doi_tac, product, status, total, ngayxuat, done, dain) FROM stdin;
XH_000046	KH_000026	{"[{\\"id\\": \\"TA000039\\", \\"name\\": \\"T510 TĂ cá chẽm UP số 2/50KG\\", \\"dongia\\": \\"80.000 ₫\\", \\"soluong\\": 100, \\"thanhtien\\": \\"8.000.000 ₫\\"}, {\\"id\\": \\"TA000038\\", \\"name\\": \\"T502TĂ cá tra UP số 2/10KG \\", \\"dongia\\": \\"5.000.000 ₫\\", \\"soluong\\": 50, \\"thanhtien\\": \\"250.000.000 ₫\\"}]"}	đang vận chuyển	258000	2024-12-28 14:25:23.649577	\N	d
XH_000037	KH_000018	{"[{\\"id\\": \\"TA000038\\", \\"name\\": \\"T502TĂ cá tra UP số 2/10KG \\", \\"dongia\\": \\"5.000.000 ₫\\", \\"soluong\\": 20, \\"thanhtien\\": \\"100.000.000 ₫\\"}, {\\"id\\": \\"TA000039\\", \\"name\\": \\"T510 TĂ cá chẽm UP số 2/50KG\\", \\"dongia\\": \\"80.000 ₫\\", \\"soluong\\": 30, \\"thanhtien\\": \\"2.400.000 ₫\\"}]"}	Đã vận chuyển	102400	2024-12-27 14:15:32.836773	\N	d
XH_000036	KH_000018	{"[{\\"id\\": \\"TA000038\\", \\"name\\": \\"T502TĂ cá tra UP số 2/10KG \\", \\"dongia\\": \\"5.000.000 ₫\\", \\"soluong\\": 100, \\"thanhtien\\": \\"500.000.000 ₫\\"}, {\\"id\\": \\"TA000039\\", \\"name\\": \\"T510 TĂ cá chẽm UP số 2/50KG\\", \\"dongia\\": \\"80.000 ₫\\", \\"soluong\\": 200, \\"thanhtien\\": \\"16.000.000 ₫\\"}]"}	Đã vận chuyển	516000	2024-12-27 14:12:10.07989	\N	\N
XH_000038	KH_000018	{"[{\\"id\\": \\"TA000038\\", \\"name\\": \\"T502TĂ cá tra UP số 2/10KG \\", \\"dongia\\": \\"5.000.000 ₫\\", \\"soluong\\": 5, \\"thanhtien\\": \\"25.000.000 ₫\\"}, {\\"id\\": \\"TA000039\\", \\"name\\": \\"T510 TĂ cá chẽm UP số 2/50KG\\", \\"dongia\\": \\"80.000 ₫\\", \\"soluong\\": 10, \\"thanhtien\\": \\"800.000 ₫\\"}]"}	Đã vận chuyển	25800	2024-12-27 14:15:53.64157	\N	\N
XH_000049	KH_000026	{"[{\\"id\\": \\"TA000038\\", \\"name\\": \\"T502TĂ cá tra UP số 2/10KG \\", \\"dongia\\": \\"5.000.000 ₫\\", \\"soluong\\": 3, \\"thanhtien\\": \\"15.000.000 ₫\\"}]"}	Đã vận chuyển	15000	2025-01-19 08:38:07.962779	\N	\N
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
2024-12-27 13:55:21.669048	Tạo đơn đặt hàng	DH_000142	35
2024-12-27 13:59:16.090975	Thanh toán	DH_000142	35
2024-12-27 14:08:44.572256	Tạo đơn đặt hàng	DH_000152	60
2024-12-27 14:08:44.62937	Tạo đơn đặt hàng	DH_000148	60
2024-12-27 14:08:44.683381	Tạo đơn đặt hàng	DH_000150	60
2024-12-27 14:09:38.976923	Thanh toán	DH_000148	35
2024-12-27 14:10:30.315568	Thanh toán	DH_000150	35
2024-12-27 14:11:18.629131	Đã vận chuyển	DH_000148	50
2024-12-27 14:11:23.728636	Đã vận chuyển	DH_000150	50
2024-12-27 14:16:42.129185	Thanh toán	DH_000152	35
2024-12-27 14:17:15.325062	Tạo đơn đặt hàng	DH_000154	35
2024-12-27 14:17:31.620227	Tạo đơn đặt hàng	DH_000156	35
2024-12-27 14:17:31.668307	Tạo đơn đặt hàng	DH_000158	35
2024-12-27 14:33:49.388635	Tạo đơn đặt hàng	DH_000160	35
2024-12-28 04:48:51.866348	Tạo đơn đặt hàng	DH_000162	35
2024-12-28 04:49:21.52462	Thanh toán	DH_000154	35
2024-12-28 04:53:53.606741	Tạo đơn đặt hàng	DH_000164	35
2024-12-28 04:54:25.785984	Tạo đơn đặt hàng	DH_000166	35
2024-12-28 04:55:04.801928	Thanh toán	DH_000164	35
2024-12-28 04:56:58.474178	Đã vận chuyển	DH_000164	50
2024-12-28 14:17:46.112161	Tạo sản phẩm	TA000050	35
2024-12-28 14:18:30.932823	Tạo sản phẩm	TA000051	35
2024-12-28 14:20:14.461687	Xóa sản phẩm	TA000050	35
2024-12-28 14:20:15.30403	Xóa sản phẩm	TA000051	35
2024-12-28 14:23:48.084151	Thêm đối tác	KH_000026	35
2024-12-28 14:33:56.070354	Đã vận chuyển	DH_000152	50
2025-01-16 13:57:53.402638	Tạo sản phẩm	TA000052	35
2025-01-16 13:58:08.820909	Chỉnh sửa sản phẩm	TA000052	35
2025-01-16 13:59:42.299927	Tạo đơn đặt hàng	DH_000168	51
2025-01-16 13:59:42.342491	Tạo đơn đặt hàng	DH_000170	51
2025-01-19 09:00:01.104004	Đã vận chuyển	DH_000154	50
2025-01-19 13:19:00.734358	Tạo đơn đặt hàng	DH_000172	35
2025-01-19 13:19:23.9077	Thanh toán	DH_000156	35
2025-01-19 13:19:50.477956	Đã vận chuyển	DH_000156	50
2025-01-19 13:21:25.552394	Thanh toán	DH_000172	35
2025-01-19 13:21:36.853561	Đã vận chuyển	DH_000172	50
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
150	200	Công ty ABC	https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/public/517c1697-e02c-4ec9-b1ae-466bdb622c44.jpg	thành phần\n	TA000052	Thức ăn cá tra
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
35	5c4a8b76-45a6-41a9-beac-25a09713b12d	212490e9b2f6df75752be185a6d94de93f6cc122532b8956818f2270b6d7b342	1735366171954
36	7270486d-9960-48d6-97e5-031613c6a671	ac28e154a3902ebb62e1aa9d291e76ce95f8ca5b0c9b69bac25d188b367aab4c	1735400401182
37	5c4a8b76-45a6-41a9-beac-25a09713b12d	cbc46b499f18d9fd8c5d5409dc2426418762314362bfb5588846ecd5eec1e59c	1735400437514
38	28f8a1a7-0d11-43ba-bf6c-44d3ad711451	d58d4680c53d3680e90b601b5f8854b3ea1ad08d96020b73caa803ad06ce83bb	1737037171105
39	28f8a1a7-0d11-43ba-bf6c-44d3ad711451	52b1e67267a06a5336b5965b1c233bc453091802b19ee959c78673adde627aa8	1737037367672
40	28f8a1a7-0d11-43ba-bf6c-44d3ad711451	83b2191a5c9dd31ff61c919df274a54dc02af185e4d8705fd8c38b764cce600e	1737037500423
41	28f8a1a7-0d11-43ba-bf6c-44d3ad711451	37bf2cc51e2a48bb5d62321837dd49630a81c5c34066fd78840cfe86eb3ccb99	1737037501872
42	28f8a1a7-0d11-43ba-bf6c-44d3ad711451	9f7faeecacd507c640f3499998671585d19dcc5dafd97a9d087ad954e6624660	1737279532941
43	28f8a1a7-0d11-43ba-bf6c-44d3ad711451	bad40727f05765677c195eb23f9ef2ff38ef5c7a63a1424783ebf87c5c989704	1737280039331
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
2024-12-05 00:00:00	2024-12-28 14:33:56.010263	1000	DH_000152	TA000049
2025-03-21 00:00:00	2024-12-27 14:11:18.578323	122	DH_000148	TA000038
2025-03-21 00:00:00	2024-12-27 14:11:18.578323	22	DH_000148	TA000040
2024-09-19 00:00:00	2025-01-19 09:00:01.053303	200	DH_000154	TA000048
2024-09-19 00:00:00	2025-01-19 09:00:01.053303	100	DH_000154	TA000049
2025-02-07 00:00:00	2025-01-19 13:19:50.434142	30	DH_000156	TA000038
2025-02-13 00:00:00	2025-01-19 13:21:36.799044	3	DH_000172	TA000048
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, email, password, status, role, bank, stk, ngay_sinh, sdt, cccd, dia_chi, manv) FROM stdin;
e1a84556-0b25-4404-a580-7e47816e3195	Nguyễn Văn A	senkiwasona@gmail.com	$2a$10$4.seAZWEbWTMyCmV9gxdN.won/s5ifWafpKsYucGzXwXmS0q4Vg3O	active	kế toán	3	3	2024-12-14	0932870398	093203007764	Đường Tạ Quang Bửu, Khu phố 6, phường Linh Trung, thành phố Thủ Đức, Thành phố Hồ Chí Minh	51
5c4a8b76-45a6-41a9-beac-25a09713b12d	Lâm Gia Bảo	lamgiabao1039@gmail.com	$2b$10$u708NymotV9r.lLkRA2n.eINxNUzoehy8cE2hzzSChJqnv9DhYz.u	active	admin	3	3	2024-12-11	093287039	093203007764	Đường Tạ Quang Bửu, Khu phố 6, phường Linh Trung, thành phố Thủ Đức, Thành phố Hồ Chí Minh	35
0af81105-6041-4038-a8a8-42ab34956f29	Lâm Gia Bảo	folayib669@bflcafe.com	$2a$10$FlMcg3gzvu3K6NqyDOUzK.ZeRTu98aS63jJXb.5ea3HFoYH9zgwga	active		3	3	2024-12-14	0932870398	093203007764	Đường Tạ Quang Bửu, Khu phố 6, phường Linh Trung, thành phố Thủ Đức, Thành phố Hồ Chí Minh	52
28f8a1a7-0d11-43ba-bf6c-44d3ad711451	Lê Hoàng B	sakagawakyohei@gmail.com	$2b$10$gpsquZbuzmL10fgcPDFN5eJfJ03DZmRpqP/846GeDLxa5oPFuOxWO	active	người vận chuyển	3	3	2024-12-14	0932870398	093203007764	Đường Tạ Quang Bửu, Khu phố 6, phường Linh Trung, thành phố Thủ Đức, Thành phố Hồ Chí Minh	50
7a16e642-0316-48d0-bb00-24cbbaca2e59	Nguyễn Công	21520607@gm.uit.edu.vn	$2a$10$IrBfg/8uMtGrCFJH3fD5m.O1B89/YeM88ox6VQXsdsz7zU1YnTTem	active	kế toán	21520607@gm.uit.edu.vn	8	2024-12-03	21520607@gm.uit.edu.vn	21520607@gm.uit.edu.vn	21520607@gm.uit.edu.vn	60
7270486d-9960-48d6-97e5-031613c6a671	abc	herone4115@evnft.com	$2a$10$6r3qc8siEbdl4MuWh0plGuzNsPD/7xOj4OZO8hEk7d910wDXWKdy6		người vận chuyển	BIDV	0937493	2024-12-12	039847	01847294	10, HCM	61
3f4f5bbf-9294-4d8b-9846-39d1d0ed9095	gagem13591@citdaca.com	gagem13591@citdaca.com	$2a$10$Gbp3zZR1B3IwhvE3iIIUN.YRUtY9uvw58hksXYvT7BElF8jK8gSwS		người vận chuyển	0832083	2837203	2025-01-08	918472984	01839203	gagem13591@citdaca.com	62
\.


--
-- Data for Name: vanchuyen; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vanchuyen (id, id_don_hang, status, nhapxuat, start_time, done_time, kho_xuat_hang, dia_chi_kho, id_nguoi_van_chuyen, id_doi_tac) FROM stdin;
f20a00b0-96c4-479d-96da-8ac202595a54	DH_000150	Đã vận chuyển	Nhập	2024-12-27 14:10:30.389255	2024-12-27 14:11:23.620975	Kho thức ăn XYZ	19, phường Linh Trung, thành phố Thủ Đức, thành phố Hồ Chí Minh	50	\N
e6b79227-bae9-4877-8388-4c0b972a5feb	XH_000036	Đã vận chuyển	Xuất	2024-12-27 14:12:10.124879	2024-12-27 14:12:38.93893	Nguyễn Văn 	Số 10, Phố Lê Văn Lương, Quận Thanh Xuân, Hà Nội, Việt Nam	50	KH_000018
1b0eba76-7fb1-4803-bfa6-1729b0284d14	DH_000164	Đã vận chuyển	Nhập	2024-12-28 04:55:04.858963	2024-12-28 04:56:58.382926	Kho ABC	10, Thủ Đức, HCM	50	\N
e8de9f4d-5e64-4046-957f-fe54ee9636ae	XH_000046	đang vận chuyển	Xuất	2024-12-28 14:25:23.698413	\N	Nguyên 	10, Thủ Đức, HCM	50	KH_000026
f7a59529-298d-4c21-b4e0-fe35b4907b8b	DH_000152	Đã vận chuyển	Nhập	2024-12-27 14:16:42.18118	2024-12-28 14:33:55.96213	Kho ANM	109, đường XXX, thành phố YYY	50	\N
f400c75a-c93a-42cc-8d2a-de4486752baf	XH_000037	Đã vận chuyển	Xuất	2024-12-27 14:15:32.881158	2024-12-28 14:34:04.669156	Nguyễn Văn 	Số 10, Phố Lê Văn Lương, Quận Thanh Xuân, Hà Nội, Việt Nam	50	KH_000018
b03910c7-f0e5-423a-add1-fad1db249bdc	XH_000038	Đã vận chuyển	Xuất	2024-12-27 14:15:53.685929	2024-12-28 14:34:12.533552	Nguyễn Văn 	Số 10, Phố Lê Văn Lương, Quận Thanh Xuân, Hà Nội, Việt Nam	50	KH_000018
fd50284f-6adf-43c4-a99d-da8423eb24a4	DH_000148	Đã vận chuyển	Nhập	2024-12-27 14:09:39.017678	2024-12-27 14:11:18.516697	Kho thành phẩm ABC	20, Thanh Xuân, Hà Nội, Việt Nam	50	\N
a5e2a5d2-1f98-4374-883f-ca25d0aecd22	DH_000154	Đã vận chuyển	Nhập	2024-12-28 04:49:21.571677	2025-01-19 09:00:00.994878	Kho AD	10, Thủ Đức, HCM	50	\N
c12c6103-1690-4f09-98a1-fbb747caefb7	XH_000049	Đã vận chuyển	Xuất	2025-01-19 08:38:08.042262	2025-01-19 09:00:06.504057	Nguyên 	10, Thủ Đức, HCM	50	KH_000026
cb84004c-7ac6-4612-8409-75874d284ba2	DH_000156	Đã vận chuyển	Nhập	2025-01-19 13:19:23.958844	2025-01-19 13:19:50.386847	kho abc	103	50	\N
98c753e9-d508-49ba-bda3-aba3635f60dc	DH_000172	Đã vận chuyển	Nhập	2025-01-19 13:21:25.603353	2025-01-19 13:21:36.747545	abc	HCM	50	\N
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

SELECT pg_catalog.setval('public.dondathang_id_seqqq', 172, true);


--
-- Name: donxuathang_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.donxuathang_id_seq', 50, true);


--
-- Name: manv_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.manv_seq', 62, true);


--
-- Name: partner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.partner_id_seq', 26, true);


--
-- Name: product_code_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_code_seq', 52, true);


--
-- Name: reset_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reset_tokens_id_seq', 43, true);


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

