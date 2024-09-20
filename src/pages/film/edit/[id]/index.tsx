import { getFilmDetail } from "@/api/film";
import FilmForm from "@/components/FilmForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FilmEdit() {
  const [data, setData] = useState();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const res = await getFilmDetail(router.query.id as string);
      setData(res.data);
    })();
  }, [router]);
  return <FilmForm title="Edit Film" data={data} />;
}
