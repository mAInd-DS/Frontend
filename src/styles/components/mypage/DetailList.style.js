import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 795px;
  height: 100%;
  border-radius: 8px;
  border-top: 24px solid #36f;
  padding: 28px;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.3);
  margin: 100px;
  margin-left: 30px;
  background-color: #fff;
`;
export const ListWrapper = styled.div`
  display: flex;
  flex-direction: row;

  .back {
    font-size: 32px;
    height: auto;
    cursor: pointer;
    margin-right: 10px;
  }
`;
export const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #36f;
  border-bottom: 1px solid #36f;
  padding: 2px;
  margin-right: 10px;
`;
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 10px;
`;
export const ContentList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: end;
  margin: 8px 0;
`;
export const ContentTitle = styled.div`
  width: 130px;
  color: #666;
  font-size: 20px;
  font-weight: 400;
`;
export const ContentTxt = styled.div`
  color: #000;
  font-size: 20px;
  font-weight: 400;
`;
export const SurveyBtn = styled.button`
  display: flex;
  padding: 4px 16px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  border-radius: 8px;
  background: #666;
  color: #fff;
  font-size: 16px;
  font-weight: 300;
  border: none;
  cursor: pointer;
`;
