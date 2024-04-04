import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../services/axios";
import { AxiosResponse } from "axios";
import { userStore } from "../../stores/userStore";

import Loading from "../../components/common/Loading";

export default function OAuth() {
  const navigate = useNavigate();
  const queryParam = new URLSearchParams(location.search);
  const { setUserId, setNickName } = userStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function fetchUser() {
      await axiosInstance
        .get(`/api/users/login?code=${queryParam.get("code")}`)
        .then((res: AxiosResponse) => {
          setUserId(res.data.data.id);
          setNickName(res.data.data.nickname);
          setLoading(false);
          if (res.status == 201) {
            navigate("/nickname/signup");
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(queryParam.get("code"));
          throw new Error(error);
        });
    }
    fetchUser();
  }, []);

  return <div>{loading ? <Loading /> : null}</div>;
}
