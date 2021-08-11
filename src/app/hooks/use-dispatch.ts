import { useDispatch as _useDispatch } from 'react-redux';
import { AppDispatch } from '@app/store';

const useDispatch = (): AppDispatch => _useDispatch();

export default useDispatch;
