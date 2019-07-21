import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const ContainerImageIssueMain = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`;

export const ImageIssueMain = styled.Image`
  height: 200px;
  width: 200px;
`;

export const TextIssueMain = styled.Text`
  font-size: 24px;
  margin-top: 32px;
  margin-left: 56px;
  margin-right: 56px;
`;

export const ContainerButtonIssueMain = styled.View`
  align-items: flex-end;
  align-items: stretch;
`;

export const ButtonIssueMain = styled.TouchableOpacity`
  background-color: #1ec4f5;
  margin-bottom: 32px;
  border-radius: 40px;
  height: 42px;
  margin-left: 16px;
  margin-right: 16px;
  justify-content: center;
  align-items: center;
`;

export const TextButtonIssueMain = styled.Text`
  font-size: 14px;
  color: #fff;
`;
