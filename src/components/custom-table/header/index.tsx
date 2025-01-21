import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Button } from "@mui/material";
import { Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/router";

interface Props {
  title: string;
  backUrl?: any;
}

const HeaderSectionTableCustom = ({ title, backUrl }: Props) => {
  const router = useRouter();

  const handleBack = () => {
    router.push(backUrl);
  };

  return (
    <>
      <section className="p-5 pb-0">
        <div className="flex justify-between items-end border-b-[1px] border-slate-300 pb-4">
          <div>
            <h1 className="font-semibold text-primary text-lg cursor-default">
              {title}
            </h1>
          </div>
          {backUrl && (
            <Tooltip
              title={<Typography sx={{ color: "white" }}>Kembali</Typography>}
            >
              <div className="hover:text-blue-300">
                <Button
                  variant="contained"
                  startIcon={<ArrowBackIosNewIcon />}
                  onClick={handleBack}
                >
                  <div className="text-sm ml-1">Back</div>
                </Button>
              </div>
            </Tooltip>
          )}
        </div>
      </section>
    </>
  );
};

export default HeaderSectionTableCustom;
