<?php

use App\Models\{Product, ProductImage, Category};
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\{DB, Http, Mail};
use Illuminate\Support\Str;
class Helpers {
    function levenshtein_distance($str1, $str2)
    {
        $length1 = mb_strlen($str1, 'UTF-8');
        $length2 = mb_strlen($str2, 'UTF-8');
        
        if ($length1 == 0) return $length2;
        if ($length2 == 0) return $length1;
        
        $distance = [];
        
        for ($i = 0; $i <= $length1; $i++) {
            $distance[$i][0] = $i;
        }
        
        for ($j = 0; $j <= $length2; $j++) {
            $distance[0][$j] = $j;
        }
        
        for ($i = 1; $i <= $length1; $i++) {
            for ($j = 1; $j <= $length2; $j++) {
                $cost = (mb_substr($str1, $i - 1, 1, 'UTF-8') == mb_substr($str2, $j - 1, 1, 'UTF-8')) ? 0 : 1;
                
                $distance[$i][$j] = min(
                    $distance[$i - 1][$j] + 1,      // deletion
                    $distance[$i][$j - 1] + 1,      // insertion
                    $distance[$i - 1][$j - 1] + $cost // substitution
                );
            }
        }
        
        return $distance[$length1][$length2];
    }

    public static function uploadFiles($file, $folderName)
    {
        try{
            $fileName = time() . rand(10) . '.jpg';
            $image = Image::make($file)->encode('jpg', 75);
            $image->save(public_path('uploads/' . $folderName . '/' . $fileName));

            return [
                'status' => true, 
                'message'=> 'image saved successful'
            ];

        }catch(Exception $ex){
            return [
                'status' => false,
                'message' => $ex->getMessage() . ' on line ' . $ex->getLine() . ' ' . $ex->getFile()
            ];
        }
    }
    public static function createSlug($name, $in='product', $whr=0)
    {
        try{
            $slug = Str::slug($name, '-');

            if($in == 'product'){
                $slugExists = Product::where(DB::raw('LOWER(slug)'),strtolower($slug))->where('id','!=',$whr)->get();
            }else if($in == 'category'){
                $slugExists = Category::where(DB::raw('LOWER(slug)'), strtolower($slug))->where('id', '!=', $whr)->get();
            }
            if(count($slugExists)){
                $slug = Str::slug($name . '-' . rand(3). '-' . str::random(5) . '-');
                return $slug;
            }
            else{
                return $slug;
            }
            
        }catch(Throwable $th){
            return [
                'status' => false,
                'message' => $th->getMessage()
            ];
        }        
    }
    public static function uploadFilesThroughUrl($file,$folderName) 
    {
        try {
            // $fileName = time() . rand() .'.'.$file->extension();
            $ext = self::get_file_extension($file);
            $fileName = time() . rand() .'.jpg';
            $image = Image::make($file)->encode('jpg', 75);
            $image->save(public_path('uploads/'.$folderName.'/'.$fileName));
            return ['status' => true, 'message' => config('constant.common.messages.success_image'),'file_name'=>$fileName];
        }
        catch (\Exception $e) {
            return ['status' => false, 'message' => $e->getMessage() . ' '. $e->getLine() . ' '. $e->getFile()];
        }
    }
    public static function getProductImage($product_id, $folderName)
    {
        $product_images_arr = array();
        $product_images = ProductImage::where('id', $product_id)->get();
        if(count($product_images)){
            foreach($product_images as $images){
                $images->image = url('upload/product/' . $folderName . '/' . $images->image);
                array_push($product_images_arr, $images->image);
            }
        }
        return $product_images_arr;
    }
    public static function sendMail($template, $data, $toEmail, $toName, $subject, $fromEmail='', $attachment='')
    {
        if($fromEmail==''){
            $fromEmail = env('email');
        }
        try{
            $fromName = env('APP_NAME');
            $data = Mail::send($template, $data, function($message) use($toEmail, $toName, $subject, $data, $fromName, $fromEmail, $attachment){
                $message->to($toEmail, $toName);
                $message->subject($subject);
                if($fromEmail != '' && $fromName != ''){
                    $message->from($fromEmail, $toName);
                }
                if($attachment != ''){
                    $message->attach($attachment);
                }
            });
        }catch(\Exception $ex){
            return $ex->getMessage();
        }
    }
    public static function isValidUrl($url)
    {
        try{
            $response = Http::get($url);
            echo json_encode($response);
            if($response->successful()){
                $content = $response->body();
                libxml_use_internal_errors(true);
                $xml = simplexml_load_string($content);
                if($xml !== false){
                    return true;
                }
            }
        }catch(\Exception $ex){
            return false;
        }
    }

    public static function sendNotification($name, $description, $image, $product, $player_id)
    {
        $cleanedDescription = strip_tags($description);
        $cleanedDescription = mb_substr($cleanedDescription, 0, 100, 'UTF-8');
        $content = array(
            "en" => $cleanedDescription
        );
        $headings = array(
            "en" => $name
        );
        $buttons = [
            [
                'id' => 'Share',
                'text' => 'Share',
                'icon' => 'share', // Replace with the name of the icon image for the button (optional)
            ],
            [
                'id' => 'Bookmark',
                'text' => 'Bookmark',
                'icon' => 'bookmark', // Replace with the name of the icon image for the button (optional)
            ],
        ];
        // $icon = url('uploads/setting/'. setting('app_logo'));
        if($product!=''){
            $dataArr = array("product"=>$product->id,"name" => $name);
        }else{
            $dataArr = array("title" => $name);
        }
        $fields = array(
            // 'app_id' => env('ONE_SIGNAL_APP_ID'),
            // 'app_id' => 'f7b9f4e4-1e56-45d7-b10a-b3028e812495',
            'included_segments' => array('All'),
            'data' => $dataArr,
            'big_picture' =>$image,
            'contents' => $content,
            'headings' => $headings,
            'buttons' => $buttons,
            // 'icon' => $icon
        );
        $fields = json_encode($fields);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
                                                'Authorization: Basic '. 'Mzk4OGMxZWMtYmJhOS00MzU5LTg4MWUtMmVhMTNmZDZmMThj'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

        $response = curl_exec($ch);
        $httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return [$httpStatus, $response];


    }
}