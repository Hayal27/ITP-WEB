import React, { useState } from "react";
import { Container, Row, Col, Button, Tab, Nav, Badge, Card } from "react-bootstrap";
import {
  FaDownload, FaFilePdf, FaFileWord, FaFilePowerpoint, FaFileExcel, FaFileAlt, FaLink,
  FaSearch, FaStar, FaCloudUploadAlt, FaChevronRight, FaChevronLeft, FaRegThumbsUp, FaRegEye
} from "react-icons/fa";
import "./BusinessTools.css";

// Resource type
type ToolResource = {
  id: string;
  title: string;
  description: string;
  category: ToolCategory;
  tags: string[];
  format: string;
  icon: React.ReactNode;
  url: string;
  updated: string;
  size: string;
  downloads: number;
  featured?: boolean;
};

type ToolCategory =
  | "Templates & Forms"
  | "Legal & Policy Docs"
  | "Startup Toolkits"
  | "Guides & Manuals"
  | "Financial, HR & Admin"
  | "Branding & Marketing"
  | "Digital Tools";

// Brand palette (scoped)
const BRAND = {
  primary: "#0C7C92",
  secondary: "#6EC9C4",
  accent: "#16284F",
  neutral: "#f4f4f4",
};

// Demo data (replace with API/CMS in production)
const toolResources: ToolResource[] = [
  {
    id: "bp-template",
    title: "Business Plan Template",
    description: "Editable business plan template for startups.",
    category: "Templates & Forms",
    tags: ["#Startup", "#Admin", "#Editable"],
    format: ".docx",
    icon: <FaFileWord />,
    url: "/src/assets/resources/business-plan-template.docx",
    updated: "2024-05-01",
    size: "120 KB",
    downloads: 312,
    featured: true,
  },
  {
    id: "pitch-deck",
    title: "Pitch Deck Template",
    description: "Professional pitch deck for fundraising.",
    category: "Templates & Forms",
    tags: ["#Startup", "#Pitch", "#Editable"],
    format: ".pptx",
    icon: <FaFilePowerpoint />,
    url: "/src/assets/resources/pitch-deck-template.pptx",
    updated: "2024-04-20",
    size: "1.2 MB",
    downloads: 198,
    featured: true,
  },
  {
    id: "nda-template",
    title: "NDA Template",
    description: "Non-disclosure agreement for partners.",
    category: "Legal & Policy Docs",
    tags: ["#Legal", "#Compliance"],
    format: ".pdf",
    icon: <FaFilePdf />,
    url: "/src/assets/resources/nda-template.pdf",
    updated: "2024-03-15",
    size: "80 KB",
    downloads: 154,
  },
  {
    id: "startup-checklist",
    title: "Startup Launch Checklist",
    description: "Step-by-step checklist for launching your startup.",
    category: "Startup Toolkits",
    tags: ["#Toolkit", "#Startup"],
    format: ".pdf",
    icon: <FaFilePdf />,
    url: "/src/assets/resources/startup-launch-checklist.pdf",
    updated: "2024-04-10",
    size: "60 KB",
    downloads: 221,
    featured: true,
  },
  {
    id: "tenant-handbook",
    title: "Tenant Handbook",
    description: "Guide for working at Ethiopian IT Park.",
    category: "Guides & Manuals",
    tags: ["#Guide", "#Onboarding"],
    format: ".pdf",
    icon: <FaFilePdf />,
    url: "/src/assets/resources/tenant-handbook.pdf",
    updated: "2024-02-28",
    size: "1.1 MB",
    downloads: 99,
  },
  {
    id: "cashflow-sheet",
    title: "Cash Flow Sheet",
    description: "Track your startup's cash flow easily.",
    category: "Financial, HR & Admin",
    tags: ["#Finance", "#Operations"],
    format: ".xlsx",
    icon: <FaFileExcel />,
    url: "/src/assets/resources/cashflow-sheet.xlsx",
    updated: "2024-03-12",
    size: "45 KB",
    downloads: 87,
  },
  {
    id: "logo-pack",
    title: "Ethiopian IT Park Logo Pack",
    description: "Official logo assets in PNG and SVG.",
    category: "Branding & Marketing",
    tags: ["#Media", "#Branding", "#Design"],
    format: ".zip",
    icon: <FaFileAlt />,
    url: "/src/assets/resources/itpark-logo-pack.zip",
    updated: "2024-01-10",
    size: "2.5 MB",
    downloads: 143,
    featured: true,
  },
  {
    id: "workspace-booking",
    title: "Workspace Booking Portal",
    description: "Book your workspace online.",
    category: "Digital Tools",
    tags: ["#Digital", "#Interactive"],
    format: "Link",
    icon: <FaLink />,
    url: "https://workspace.itpark.et",
    updated: "Live",
    size: "-",
    downloads: 0,
  },
  // Add more resources as needed...
];

// Category tabs
const categories: { key: ToolCategory; label: string }[] = [
  { key: "Templates & Forms", label: "Templates & Forms" },
  { key: "Legal & Policy Docs", label: "Legal & Policy Docs" },
  { key: "Startup Toolkits", label: "Startup Toolkits" },
  { key: "Guides & Manuals", label: "Guides & Manuals" },
  { key: "Financial, HR & Admin", label: "Financial, HR & Admin" },
  { key: "Branding & Marketing", label: "Branding & Marketing" },
  { key: "Digital Tools", label: "Digital Tools" },
];

const formatIcons: Record<string, React.ReactNode> = {
  ".pdf": <FaFilePdf color="#e74c3c" />,
  ".docx": <FaFileWord color="#2980b9" />,
  ".pptx": <FaFilePowerpoint color="#e67e22" />,
  ".xlsx": <FaFileExcel color="#27ae60" />,
  ".zip": <FaFileAlt color="#7f8c8d" />,
  "Link": <FaLink color="#0C7C92" />,
};

const BusinessTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ToolCategory>("Templates & Forms");
  const [search, setSearch] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Filtered resources
  const filteredResources = toolResources.filter(
    (r) =>
      (r.category === activeTab || activeTab === "Digital Tools") &&
      (r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase()) ||
        r.tags.join(" ").toLowerCase().includes(search.toLowerCase()))
  );

  // Featured carousel
  const featured = toolResources.filter((r) => r.featured);

  // Carousel controls
  const nextCarousel = () => setCarouselIndex((carouselIndex + 1) % featured.length);
  const prevCarousel = () => setCarouselIndex((carouselIndex - 1 + featured.length) % featured.length);

  return (
    <div className="etp-tools-page">
      {/* Hero Section */}
      <section className="etp-tools-hero">
        <Container>
          <Row className="align-items-center">
            <Col md={7}>
              <h1 className="etp-tools-hero-title">Your Innovation Toolbox</h1>
              <p className="etp-tools-hero-subtitle">
                Download, use, and adapt essential business tools, forms, and digital resources tailored for startups, enterprises, and ecosystem partners at Ethiopian IT Park.
              </p>
              <div className="etp-tools-hero-cta">
                <Button className="etp-tools-btn-primary" size="lg">
                  <FaDownload style={{ marginRight: 8 }} /> Download All Resources
                </Button>
                <Button className="etp-tools-btn-secondary" size="lg" variant="outline-light">
                  <FaCloudUploadAlt style={{ marginRight: 8 }} /> Upload Your Tool
                </Button>
              </div>
            </Col>
            <Col md={5} className="text-center">
              <img src="/images/hero/hero-toolkit.png" alt="Innovation Toolkit" className="etp-tools-hero-img" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Carousel */}
      <section className="etp-tools-featured">
        <Container>
          <Row className="justify-content-center">
            <Col md={12}>
              <div className="etp-tools-featured-title text-center">
                <FaStar className="etp-tools-featured-star" /> Featured Tools & Templates
              </div>
            </Col>
          </Row>
          <div className="etp-tools-carousel">
            <Button className="etp-tools-carousel-btn" onClick={prevCarousel}><FaChevronLeft /></Button>
            <Card className="etp-tools-carousel-card">
              <Card.Body>
                <div className="etp-tools-carousel-icon">
                  {formatIcons[featured[carouselIndex].format] || <FaFileAlt />}
                </div>
                <Card.Title>{featured[carouselIndex].title}</Card.Title>
                <Card.Text>{featured[carouselIndex].description}</Card.Text>
                <div className="etp-tools-carousel-meta">
                  <Badge bg="info">{featured[carouselIndex].format}</Badge>
                  <span className="etp-tools-carousel-updated">Updated: {featured[carouselIndex].updated}</span>
                  <span className="etp-tools-carousel-size">{featured[carouselIndex].size}</span>
                </div>
                <div className="etp-tools-carousel-actions">
                  <Button
                    className="etp-tools-btn-primary"
                    href={featured[carouselIndex].url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaDownload /> Download
                  </Button>
                  <Button
                    className="etp-tools-btn-action"
                    variant="outline-primary"
                  >
                    <FaRegThumbsUp /> Like
                  </Button>
                  <Button
                    className="etp-tools-btn-action"
                    variant="outline-secondary"
                  >
                    <FaRegEye /> Preview
                  </Button>
                </div>
              </Card.Body>
            </Card>
            <Button className="etp-tools-carousel-btn" onClick={nextCarousel}><FaChevronRight /></Button>
          </div>
        </Container>
      </section>

      {/* Category Tabs & Grid */}
      <section className="etp-tools-main">
        <Container>
          <Tab.Container activeKey={activeTab} onSelect={k => setActiveTab(k as ToolCategory)}>
            <Nav variant="pills" className="etp-tools-tabs mb-4 justify-content-center">
              {categories.map(cat => (
                <Nav.Item key={cat.key}>
                  <Nav.Link
                    eventKey={cat.key}
                    className="etp-tools-tab"
                    style={{
                      color: activeTab === cat.key ? BRAND.primary : BRAND.accent,
                      background: activeTab === cat.key ? BRAND.secondary : "transparent"
                    }}
                  >
                    {cat.label}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey={activeTab}>
                <Row xs={1} sm={2} md={3} lg={4} className="g-2">
                  {filteredResources.length === 0 && (
                    <Col>
                      <div className="etp-tools-empty">
                        <FaSearch size={32} />
                        <div>No tools found for your search.</div>
                      </div>
                    </Col>
                  )}
                  {filteredResources.map(res => (
                    <Col key={res.id}>
                      <Card className="etp-tools-card">
                        <Card.Body>
                          <div className="etp-tools-card-icon">
                            {formatIcons[res.format] || <FaFileAlt />}
                          </div>
                          <Card.Title className="etp-tools-card-title">{res.title}</Card.Title>
                          <Card.Text className="etp-tools-card-desc">{res.description}</Card.Text>
                          <div className="etp-tools-card-tags">
                            {res.tags.map(tag => (
                              <Badge key={tag} bg="secondary" className="etp-tools-card-tag">{tag}</Badge>
                            ))}
                          </div>
                          <div className="etp-tools-card-meta">
                            <span>Updated: {res.updated}</span>
                            <span>Size: {res.size}</span>
                          </div>
                          <div className="etp-tools-card-actions">
                            <Button
                              className="etp-tools-btn-primary"
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              size="sm"
                            >
                              <FaDownload /> Download
                            </Button>
                            <Button
                              className="etp-tools-btn-action"
                              variant="outline-primary"
                              size="sm"
                            >
                              <FaRegEye /> Preview
                            </Button>
                          </div>
                        </Card.Body>
                        <Card.Footer className="etp-tools-card-footer">
                          <span>
                            <FaDownload /> {res.downloads} downloads
                          </span>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="etp-tools-cta etp-tools-cta-full">
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col md={12}>
              <h2 className="etp-tools-cta-title">
                Need a tool we haven’t listed? Let us know.
              </h2>
              <p className="etp-tools-cta-desc">
                Submit a request, suggest a tool, or talk to our Innovation Support Team.
              </p>
              <div className="etp-tools-cta-actions">
                <Button className="etp-tools-btn-primary" size="lg">
                  <FaCloudUploadAlt style={{ marginRight: 8 }} /> Submit a Request
                </Button>
                <Button className="etp-tools-btn-secondary" size="lg" variant="outline-light">
                  <FaStar style={{ marginRight: 8 }} /> Suggest a Tool
                </Button>
                <Button className="etp-tools-btn-secondary" size="lg" variant="outline-light">
                  <FaRegThumbsUp style={{ marginRight: 8 }} /> Talk to Support
                </Button>
              </div>
            </Col>
            <Col md={4} className="text-center">
              <img src="/images/cta/cta-support.png" alt="Support" className="etp-tools-cta-img" />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default BusinessTools;