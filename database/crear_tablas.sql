-- Schema public

-- TABLA REPORTES.
CREATE TABLE public.reportes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT,
    news_title TEXT,
    news_section TEXT,
    contra_news TEXT,
    contra_podcast TEXT,
    youtube TEXT,
    linkedin TEXT,
    facebook TEXT,
    instagram TEXT,
    instagram_story TEXT,
    tiktok1 TEXT,
    tiktok2 TEXT,
    twitter TEXT,
    image_url TEXT,
    description TEXT,
    -- Archivos subidos a Cloudinary, ver si aplicar o no.
    seo_podcast_url TEXT,
    seo_capture_url TEXT,
    -- Metadatos y estado, algún día servirán (?)
    report_date DATE DEFAULT CURRENT_DATE,
    status TEXT DEFAULT 'active'
);

-- TABLA NEWSLETTER PARA HTML.
CREATE TABLE public.newsletter (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    reporte_id UUID REFERENCES public.reportes(id) ON DELETE CASCADE,
    article_html TEXT NOT NULL,
    article_title TEXT,
    block_section TEXT,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    status TEXT DEFAULT 'active'
);

CREATE INDEX idx_reportes_created_at ON public.reportes(created_at);
CREATE INDEX idx_reportes_news_section ON public.reportes(news_section);
CREATE INDEX idx_reportes_report_date ON public.reportes(report_date);
CREATE INDEX idx_newsletter_reporte_id ON public.newsletter(reporte_id);
CREATE INDEX idx_newsletter_created_at ON public.newsletter(created_at);
--Políticas RLS
ALTER TABLE public.reportes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON public.reportes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON public.reportes FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.newsletter FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON public.newsletter FOR SELECT USING (true);
COMMENT ON TABLE public.reportes IS 'Tabla para almacenar todos los datos del formulario de reportes';
COMMENT ON TABLE public.newsletter IS 'Tabla para almacenar el contenido HTML generado para el newsletter';
COMMENT ON COLUMN public.reportes.name IS 'Nombre del usuario que crea el reporte';
COMMENT ON COLUMN public.reportes.news_title IS 'Título de la noticia';
COMMENT ON COLUMN public.reportes.news_section IS 'Bloque/sección de la noticia';
COMMENT ON COLUMN public.reportes.seo_podcast_url IS 'URL del archivo SEO Podcast subido a Cloudinary';
COMMENT ON COLUMN public.reportes.seo_capture_url IS 'URL del archivo SEO Capture subido a Cloudinary';
COMMENT ON COLUMN public.newsletter.reporte_id IS 'ID del reporte relacionado';
COMMENT ON COLUMN public.newsletter.article_html IS 'Contenido HTML completo del artículo para newsletter';
