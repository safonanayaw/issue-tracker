import { Skeleton } from "@/app/components";
import { Box, Card } from "@radix-ui/themes";

const loading = () => {
    const issues = [1,2,3,4,5];
    return(
        <Box>
            <Skeleton className="max-w-xl"/>
            <div className='flex space-x-3'>
            <Skeleton  width="5rem"/>
            <Skeleton width="8rem"/>
            </div>

            <Card className="prose" mt="4">
                <Skeleton count={3}/>
            </Card>

        </Box>
    )
}
export default loading;