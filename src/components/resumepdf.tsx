import { Button } from "@/components/ui/button";
// import { CoolMode } from "@/components/magicui/cool-mode";

export function CoolModeDemo() {
  const handleDownload = () => {
    const pdfUrl = "/IshanResume.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Ishan-IshanResume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative justify-center">
      {/* <CoolMode> */}
        <Button onClick={handleDownload}>Download Resume</Button>
      {/* </CoolMode> */}
    </div>
  );
}