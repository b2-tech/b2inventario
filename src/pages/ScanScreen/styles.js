import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
`;

export const ViewLoad = styled.View`
  flex: 1;
  padding-top: 20;
  justify-content: center;
`;

export const ActivityIndicatorLoad = styled.ActivityIndicator``;

export const ContainerImageIssueMain = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`;

export const ErrorMessage = styled.Text`
  text-align: center;
  color: #ce2029;
  font-size: 16px;
  margin-bottom: 15px;
  margin-horizontal: 20px;
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
  align-items: stretch;
  margin-left: 16px;
  margin-right: 16px;
`;

export const ButtonIssueMain = styled.TouchableOpacity`
  background-color: #1ec4f5;
  margin-top: 20px;
  margin-bottom: 32px;
  border-radius: 40px;
  height: 42px;
  justify-content: center;
  align-items: center;
`;

export const TextButtonIssueMain = styled.Text`
  font-size: 14px;
  color: #fff;
`;
