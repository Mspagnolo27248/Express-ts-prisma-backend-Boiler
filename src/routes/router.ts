import { Router } from "express";
import productsRouter from "./products";
import blendRequirements from "./blend-requirments";
import schedule from "./schedule";
import unitYields from "./unit-yields";
import unitChargeProducts from "./unit-charge-products";



const router = Router();

/*Note Routes should be lowercase and kebab case*/
/*Should we create a stadard return object like {"data":[] , "success":[], count:int*/ 
router.use('/products',productsRouter);
router.use('/blend-requirements',blendRequirements);
router.use('/schedule',schedule);
router.use('/unit-yields',unitYields);
router.use('/unit-charge-products',unitChargeProducts)


export default router;