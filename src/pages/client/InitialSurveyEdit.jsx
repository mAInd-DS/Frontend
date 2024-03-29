import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { editSurveyState } from "../../recoil/atom";
import { useForm } from "react-hook-form";
import * as I from "../../styles/pages/InitialSurvey.style";
import { useQuery, useMutation } from "react-query";
import { getInitialSurvey, editInitialSurvey } from "./../../api/api";
import { DateFormat } from "./../../utils/DateFormat";

const symptomsData = [
  { id: 1, name: "우울" },
  { id: 2, name: "불안" },
  { id: 3, name: "강박" },
  { id: 4, name: "트라우마" },
  { id: 5, name: "급식 및 섭식장애" },
  { id: 6, name: "수면장애" },
  { id: 7, name: "중독 장애(약/알코올)" },
];

export default function InitialSurveyEdit() {
  const { survey_id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm();
  const [, setIsEditSurvey] = useRecoilState(editSurveyState);
  const {
    data: result,
    isLoading,
    isError,
  } = useQuery("initialSurvey", () => getInitialSurvey(survey_id), {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const { mutate, status } = useMutation("editStatus", editInitialSurvey);

  if (isLoading) {
    return <p>Loading user data...</p>;
  } else if (isError) {
    return <p>Error fetching user data</p>;
  } else if (!result) {
    return <p>No data available</p>;
  }

  const handleCheckboxChange = (id) => {
    const currentValues = getValues().symptoms || [];
    if (currentValues.includes(id)) {
      setValue(
        "symptoms",
        currentValues.filter((item) => item !== id)
      );
    } else {
      setValue("symptoms", [...currentValues, id]);
    }
  };

  const onClickEdit = () => {
    setIsEditSurvey(true);
  };

  const onEditSurvey = (data) => {
    console.log(data);
    const editedData = {
      ...data,
      survey_id: survey_id,
    };

    mutate(editedData, {
      onSuccess: (response) => {
        console.log(response.data);
        console.log("Mutation successful", response);
        navigate("/mypage");
      },
      onError: (error) => {
        console.error("Mutation error", error);
      },
    });
  };

  if (status === "loading") {
    return <p>Loading user data...</p>;
  }

  return (
    <>
      <I.Base>
        <I.Title>초기 설문지</I.Title>
        <form onSubmit={handleSubmit(onEditSurvey)}>
          <I.Wrapper>
            <I.InfoWrapper>
              <I.InputWrapper>
                <I.Label>이름</I.Label>
                <I.InputBox
                  id="name"
                  type="text"
                  value={result.name}
                  {...register("name")}
                />
              </I.InputWrapper>
              <I.ErrorText>{errors?.name?.message}</I.ErrorText>
              <I.InputWrapper>
                <I.Label>이메일</I.Label>
                <I.InputBox
                  id="email"
                  type="email"
                  value={result.email}
                  {...register("email")}
                />
              </I.InputWrapper>
              <I.ErrorText>{errors?.email?.message}</I.ErrorText>
              <I.InputWrapper>
                <I.Label>휴대폰</I.Label>
                <I.InputBox
                  id="phone"
                  type="text"
                  value={result.phone}
                  {...register("phone")}
                />
              </I.InputWrapper>
              <I.ErrorText>{errors?.phone?.message}</I.ErrorText>
              <I.InputWrapper>
                <I.Label>생년월일</I.Label>
                <I.InputBox
                  id="birth"
                  type="text"
                  value={DateFormat(result.birth)}
                  {...register("birth")}
                />
              </I.InputWrapper>
              <I.ErrorText>{errors?.birth?.message}</I.ErrorText>
              <I.InputWrapper>
                <I.Label>학력</I.Label>
                <I.InputBox
                  id="education"
                  type="text"
                  value={result.education}
                  {...register("education")}
                />
              </I.InputWrapper>
              <I.ErrorText>{errors?.education?.message}</I.ErrorText>
            </I.InfoWrapper>
            <I.InputWrapper>
              <I.RadioWrapper>
                <I.Label>성별</I.Label>
                <I.InputBox
                  id="gender"
                  type="text"
                  value={result.gender}
                  {...register("gender")}
                />
              </I.RadioWrapper>
            </I.InputWrapper>
            <I.ErrorText>{errors?.gender?.message}</I.ErrorText>
            <I.InputWrapper>
              <I.Label>증상</I.Label>
              <I.CheckboxContainer>
                {symptomsData?.map((symptom) => (
                  <I.CheckboxItem key={symptom.id}>
                    <I.CustomCheckbox
                      type="checkbox"
                      id={`symptom-${symptom.id}`}
                      value={symptom.name}
                      defaultChecked={result.symptoms?.includes(symptom.name)}
                      checked={
                        getValues().symptoms &&
                        getValues().symptoms.includes(symptom.id)
                      }
                      onChange={() => handleCheckboxChange(symptom.id)}
                      {...register("symptoms")}
                    />
                    <I.CustomLabel htmlFor={`symptom-${symptom.id}`}>
                      {symptom.name}
                    </I.CustomLabel>
                  </I.CheckboxItem>
                ))}
              </I.CheckboxContainer>
            </I.InputWrapper>

            <I.QuestionWrapper>
              <I.Question>1. 당신의 증상 및 문제행동은 무엇입니까?</I.Question>
              <I.Answer
                defaultValue={result.q_1}
                {...register("q_1", { required: "답변을 입력해주세요" })}
              />
              <I.ErrorText2>{errors?.q_1?.message}</I.ErrorText2>
              <I.Question>
                2. 당신의 증상 및 문제 행동은 언제부터 시작하였습니까?
              </I.Question>
              <I.Answer
                defaultValue={result.q_2}
                {...register("q_2", { required: "답변을 입력해주세요" })}
              />
              <I.ErrorText2>{errors?.q_2?.message}</I.ErrorText2>
              <I.Question>
                3. 당신의 증상 및 문제 행동을 어떻게 알게 되셨습니까?
              </I.Question>
              <I.Answer
                defaultValue={result.q_3}
                {...register("q_3", { required: "답변을 입력해주세요" })}
              />
              <I.ErrorText2>{errors?.q_3?.message}</I.ErrorText2>
              <I.Question>
                4. 당신의 증상 및 문제 행동에 대하여 어떻게 생각하고 느끼십니까?
              </I.Question>
              <I.Answer
                defaultValue={result.q_4}
                {...register("q_4", { required: "답변을 입력해주세요" })}
              />
              <I.ErrorText2>{errors?.q_4?.message}</I.ErrorText2>
              <I.Question>
                5. 당신의 증상 및 문제 행동을 보고 주위에서 어떠한 반응을
                보이셨습니까?
              </I.Question>
              <I.Answer
                defaultValue={result.q_5}
                {...register("q_5", { required: "답변을 입력해주세요" })}
              />
              <I.ErrorText2>{errors?.q_5?.message}</I.ErrorText2>
              <I.Question>
                6. 당신의 증상 및 문제행동이 가족을 비롯한 주위에 어떻게 영향을
                주고 있습니까?
              </I.Question>
              <I.Answer
                defaultValue={result.q_6}
                {...register("q_6", { required: "답변을 입력해주세요" })}
              />
              <I.ErrorText2>{errors?.q_6?.message}</I.ErrorText2>
              <I.Question>
                7. 당신의 증상 및 문제 행동의 원인이 무엇이라고 생각하십니까?
              </I.Question>
              <I.Answer
                defaultValue={result.q_7}
                {...register("q_7", { required: "답변을 입력해주세요" })}
              />
              <I.ErrorText2>{errors?.q_7?.message}</I.ErrorText2>
              <I.Question>8. 상담을 통해 어떤 결과를 원하시나요?</I.Question>
              <I.Answer
                defaultValue={result.q_8}
                {...register("q_8", { required: "답변을 입력해주세요" })}
              />
              <I.ErrorText2>{errors?.q_8?.message}</I.ErrorText2>
            </I.QuestionWrapper>
            <I.ButtonWrapper>
              <I.SubmitBtn type="submit" onClick={onClickEdit}>
                수정하기
              </I.SubmitBtn>
            </I.ButtonWrapper>
          </I.Wrapper>
        </form>
      </I.Base>
    </>
  );
}
